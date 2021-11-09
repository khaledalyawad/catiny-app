import React, {createRef} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';

import FollowUserActions from './follow-user.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import MasterUserActions from '../master-user/master-user.reducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import {useDidUpdateEffect} from '../../../shared/util/use-did-update-effect';
import styles from './follow-user-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
});

function FollowUserEditScreen(props)
{
  const {
    getFollowUser,
    updateFollowUser,
    route,
    followUser,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllBaseInfos,
    baseInfoList,
    getAllMasterUsers,
    masterUserList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() =>
  {
    if (!isNewEntity)
    {
      getFollowUser(route.params.entityId);
    }
    else
    {
      reset();
    }
  }, [isNewEntity, getFollowUser, route, reset]);

  React.useEffect(() =>
  {
    if (isNewEntity)
    {
      setFormValue(entityToFormValue({}));
    }
    else if (!fetching)
    {
      setFormValue(entityToFormValue(followUser));
    }
  }, [followUser, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() =>
  {
    getAllBaseInfos();
    getAllMasterUsers();
  }, [getAllBaseInfos, getAllMasterUsers]);

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
        isNewEntity || !navigation.canGoBack() ? navigation.replace('FollowUserDetail', {entityId: followUser?.id}) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateFollowUser(formValueToEntity(data));

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
  const infoRef = createRef();
  const followRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID='followUserEditScrollView'
        keyboardShouldPersistTaps='handled'
        keyboardDismissMode='on-drag'
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField name='uuid' ref={uuidRef} label='Uuid' placeholder='Enter Uuid' testID='uuidInput' />
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
              name='follow'
              inputType='select-one'
              ref={followRef}
              listItems={masterUserList}
              listItemLabelField='id'
              label='Follow'
              placeholder='Select Follow'
              testID='masterUserSelectInput'
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
    info: value.info && value.info.id ? value.info.id : null,
    follow: value.follow && value.follow.id ? value.follow.id : null,
  };
};
const formValueToEntity = (value) =>
{
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
  };
  entity.info = value.info ? {id: value.info} : null;
  entity.follow = value.follow ? {id: value.follow} : null;
  return entity;
};

const mapStateToProps = (state) =>
{
  return {
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    masterUserList: state.masterUsers.masterUserList ?? [],
    followUser: state.followUsers.followUser,
    fetching: state.followUsers.fetchingOne,
    updating: state.followUsers.updating,
    updateSuccess: state.followUsers.updateSuccess,
    errorUpdating: state.followUsers.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getAllMasterUsers: (options) => dispatch(MasterUserActions.masterUserAllRequest(options)),
    getFollowUser: (id) => dispatch(FollowUserActions.followUserRequest(id)),
    getAllFollowUsers: (options) => dispatch(FollowUserActions.followUserAllRequest(options)),
    updateFollowUser: (followUser) => dispatch(FollowUserActions.followUserUpdateRequest(followUser)),
    reset: () => dispatch(FollowUserActions.followUserReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowUserEditScreen);
