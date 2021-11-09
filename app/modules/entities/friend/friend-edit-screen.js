import React, {createRef} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';

import FriendActions from './friend.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import MasterUserActions from '../master-user/master-user.reducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import {useDidUpdateEffect} from '../../../shared/util/use-did-update-effect';
import styles from './friend-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
});

const FriendType = [
  {
    label: 'FRIEND',
    value: 'FRIEND',
  },
  {
    label: 'BEST_FRIEND',
    value: 'BEST_FRIEND',
  },
  {
    label: 'FAMILY',
    value: 'FAMILY',
  },
  {
    label: 'BLOCK',
    value: 'BLOCK',
  },
];

function FriendEditScreen(props)
{
  const {
    getFriend,
    updateFriend,
    route,
    friend,
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
      getFriend(route.params.entityId);
    }
    else
    {
      reset();
    }
  }, [isNewEntity, getFriend, route, reset]);

  React.useEffect(() =>
  {
    if (isNewEntity)
    {
      setFormValue(entityToFormValue({}));
    }
    else if (!fetching)
    {
      setFormValue(entityToFormValue(friend));
    }
  }, [friend, fetching, isNewEntity]);

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
        isNewEntity || !navigation.canGoBack() ? navigation.replace('FriendDetail', {entityId: friend?.id}) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateFriend(formValueToEntity(data));

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
  const friendTypeRef = createRef();
  const infoRef = createRef();
  const friendRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID='friendEditScrollView'
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
              onSubmitEditing={() => friendTypeRef.current?.focus()}
            />
            <FormField
              name='friendType'
              ref={friendTypeRef}
              label='Friend Type'
              placeholder='Enter Friend Type'
              testID='friendTypeInput'
              inputType='select-one'
              listItems={FriendType}
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
              name='friend'
              inputType='select-one'
              ref={friendRef}
              listItems={masterUserList}
              listItemLabelField='id'
              label='Friend'
              placeholder='Select Friend'
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
    friendType: value.friendType ?? null,
    info: value.info && value.info.id ? value.info.id : null,
    friend: value.friend && value.friend.id ? value.friend.id : null,
  };
};
const formValueToEntity = (value) =>
{
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    friendType: value.friendType ?? null,
  };
  entity.info = value.info ? {id: value.info} : null;
  entity.friend = value.friend ? {id: value.friend} : null;
  return entity;
};

const mapStateToProps = (state) =>
{
  return {
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    masterUserList: state.masterUsers.masterUserList ?? [],
    friend: state.friends.friend,
    fetching: state.friends.fetchingOne,
    updating: state.friends.updating,
    updateSuccess: state.friends.updateSuccess,
    errorUpdating: state.friends.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getAllMasterUsers: (options) => dispatch(MasterUserActions.masterUserAllRequest(options)),
    getFriend: (id) => dispatch(FriendActions.friendRequest(id)),
    getAllFriends: (options) => dispatch(FriendActions.friendAllRequest(options)),
    updateFriend: (friend) => dispatch(FriendActions.friendUpdateRequest(friend)),
    reset: () => dispatch(FriendActions.friendReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendEditScreen);
