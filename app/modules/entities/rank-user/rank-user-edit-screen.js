import React, {createRef} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';

import RankUserActions from './rank-user.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import RankGroupActions from '../rank-group/rank-group.reducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import {useDidUpdateEffect} from '../../../shared/util/use-did-update-effect';
import styles from './rank-user-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
});

function RankUserEditScreen(props)
{
  const {
    getRankUser,
    updateRankUser,
    route,
    rankUser,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllBaseInfos,
    baseInfoList,
    getAllRankGroups,
    rankGroupList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() =>
  {
    if (!isNewEntity)
    {
      getRankUser(route.params.entityId);
    }
    else
    {
      reset();
    }
  }, [isNewEntity, getRankUser, route, reset]);

  React.useEffect(() =>
  {
    if (isNewEntity)
    {
      setFormValue(entityToFormValue({}));
    }
    else if (!fetching)
    {
      setFormValue(entityToFormValue(rankUser));
    }
  }, [rankUser, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() =>
  {
    getAllBaseInfos();
    getAllRankGroups();
  }, [getAllBaseInfos, getAllRankGroups]);

  useDidUpdateEffect(() =>
  {
    if (updating === false)
    {
      if (errorUpdating)
      {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      }
      else if (updateSuccess)
      {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('RankUserDetail', {entityId: rankUser?.id}) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateRankUser(formValueToEntity(data));

  if (fetching)
  {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  const formRef = createRef();
  const uuidRef = createRef();
  const ratingPointsRef = createRef();
  const infoRef = createRef();
  const rankGroupRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID='rankUserEditScrollView'
        keyboardShouldPersistTaps='handled'
        keyboardDismissMode='on-drag'
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name='uuid'
              ref={uuidRef}
              label='Uuid'
              placeholder='Enter Uuid'
              testID='uuidInput'
              onSubmitEditing={() => ratingPointsRef.current?.focus()}
            />
            <FormField
              name='ratingPoints'
              ref={ratingPointsRef}
              label='Rating Points'
              placeholder='Enter Rating Points'
              testID='ratingPointsInput'
              inputType='number'
            />
            <FormField
              name='info'
              inputType='select-one'
              ref={infoRef}
              listItems={baseInfoList}
              listItemLabelField='id'
              label='Info'
              placeholder='Select Info'
              testID='baseInfoSelectInput'
            />
            <FormField
              name='rankGroup'
              inputType='select-one'
              ref={rankGroupRef}
              listItems={rankGroupList}
              listItemLabelField='id'
              label='Rank Group'
              placeholder='Select Rank Group'
              testID='rankGroupSelectInput'
            />

            <FormButton title={'Save'} testID={'submitButton'} />
          </Form>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = (value) =>
{
  if (!value)
  {
    return {};
  }
  return {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    ratingPoints: value.ratingPoints ?? null,
    info: value.info && value.info.id ? value.info.id : null,
    rankGroup: value.rankGroup && value.rankGroup.id ? value.rankGroup.id : null,
  };
};
const formValueToEntity = (value) =>
{
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    ratingPoints: value.ratingPoints ?? null,
  };
  entity.info = value.info ? {id: value.info} : null;
  entity.rankGroup = value.rankGroup ? {id: value.rankGroup} : null;
  return entity;
};

const mapStateToProps = (state) =>
{
  return {
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    rankGroupList: state.rankGroups.rankGroupList ?? [],
    rankUser: state.rankUsers.rankUser,
    fetching: state.rankUsers.fetchingOne,
    updating: state.rankUsers.updating,
    updateSuccess: state.rankUsers.updateSuccess,
    errorUpdating: state.rankUsers.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getAllRankGroups: (options) => dispatch(RankGroupActions.rankGroupAllRequest(options)),
    getRankUser: (id) => dispatch(RankUserActions.rankUserRequest(id)),
    getAllRankUsers: (options) => dispatch(RankUserActions.rankUserAllRequest(options)),
    updateRankUser: (rankUser) => dispatch(RankUserActions.rankUserUpdateRequest(rankUser)),
    reset: () => dispatch(RankUserActions.rankUserReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RankUserEditScreen);
