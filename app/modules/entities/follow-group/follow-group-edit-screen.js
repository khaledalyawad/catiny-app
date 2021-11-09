import React, {createRef} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';

import FollowGroupActions from './follow-group.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import GroupPostActions from '../group-post/group-post.reducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import {useDidUpdateEffect} from '../../../shared/util/use-did-update-effect';
import styles from './follow-group-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
});

function FollowGroupEditScreen(props)
{
  const {
    getFollowGroup,
    updateFollowGroup,
    route,
    followGroup,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllBaseInfos,
    baseInfoList,
    getAllGroupPosts,
    groupPostList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() =>
  {
    if (!isNewEntity)
    {
      getFollowGroup(route.params.entityId);
    }
    else
    {
      reset();
    }
  }, [isNewEntity, getFollowGroup, route, reset]);

  React.useEffect(() =>
  {
    if (isNewEntity)
    {
      setFormValue(entityToFormValue({}));
    }
    else if (!fetching)
    {
      setFormValue(entityToFormValue(followGroup));
    }
  }, [followGroup, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() =>
  {
    getAllBaseInfos();
    getAllGroupPosts();
  }, [getAllBaseInfos, getAllGroupPosts]);

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
        isNewEntity || !navigation.canGoBack() ? navigation.replace('FollowGroupDetail', {entityId: followGroup?.id}) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateFollowGroup(formValueToEntity(data));

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
  const groupDetailsRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID='followGroupEditScrollView'
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
              name='groupDetails'
              inputType='select-one'
              ref={groupDetailsRef}
              listItems={groupPostList}
              listItemLabelField='id'
              label='Group Details'
              placeholder='Select Group Details'
              testID='groupPostSelectInput'
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
    groupDetails: value.groupDetails && value.groupDetails.id ? value.groupDetails.id : null,
  };
};
const formValueToEntity = (value) =>
{
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
  };
  entity.info = value.info ? {id: value.info} : null;
  entity.groupDetails = value.groupDetails ? {id: value.groupDetails} : null;
  return entity;
};

const mapStateToProps = (state) =>
{
  return {
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    groupPostList: state.groupPosts.groupPostList ?? [],
    followGroup: state.followGroups.followGroup,
    fetching: state.followGroups.fetchingOne,
    updating: state.followGroups.updating,
    updateSuccess: state.followGroups.updateSuccess,
    errorUpdating: state.followGroups.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getAllGroupPosts: (options) => dispatch(GroupPostActions.groupPostAllRequest(options)),
    getFollowGroup: (id) => dispatch(FollowGroupActions.followGroupRequest(id)),
    getAllFollowGroups: (options) => dispatch(FollowGroupActions.followGroupAllRequest(options)),
    updateFollowGroup: (followGroup) => dispatch(FollowGroupActions.followGroupUpdateRequest(followGroup)),
    reset: () => dispatch(FollowGroupActions.followGroupReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowGroupEditScreen);
