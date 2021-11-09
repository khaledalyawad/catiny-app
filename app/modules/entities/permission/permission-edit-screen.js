import React, {createRef} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';

import PermissionActions from './permission.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import MasterUserActions from '../master-user/master-user.reducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import {useDidUpdateEffect} from '../../../shared/util/use-did-update-effect';
import styles from './permission-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
});

function PermissionEditScreen(props)
{
  const {
    getPermission,
    updatePermission,
    route,
    permission,
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
      getPermission(route.params.entityId);
    }
    else
    {
      reset();
    }
  }, [isNewEntity, getPermission, route, reset]);

  React.useEffect(() =>
  {
    if (isNewEntity)
    {
      setFormValue(entityToFormValue({}));
    }
    else if (!fetching)
    {
      setFormValue(entityToFormValue(permission));
    }
  }, [permission, fetching, isNewEntity]);

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
        isNewEntity || !navigation.canGoBack() ? navigation.replace('PermissionDetail', {entityId: permission?.id}) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updatePermission(formValueToEntity(data));

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
  const readRef = createRef();
  const writeRef = createRef();
  const shareRef = createRef();
  const deleteRef = createRef();
  const addRef = createRef();
  const levelRef = createRef();
  const baseInfoRef = createRef();
  const ownerRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID='permissionEditScrollView'
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
              onSubmitEditing={() => readRef.current?.focus()}
            />
            <FormField
              name='read'
              ref={readRef}
              label='Read'
              placeholder='Enter Read'
              testID='readInput'
              inputType='boolean'
              onSubmitEditing={() => writeRef.current?.focus()}
            />
            <FormField
              name='write'
              ref={writeRef}
              label='Write'
              placeholder='Enter Write'
              testID='writeInput'
              inputType='boolean'
              onSubmitEditing={() => shareRef.current?.focus()}
            />
            <FormField
              name='share'
              ref={shareRef}
              label='Share'
              placeholder='Enter Share'
              testID='shareInput'
              inputType='boolean'
              onSubmitEditing={() => deleteRef.current?.focus()}
            />
            <FormField
              name='delete'
              ref={deleteRef}
              label='Delete'
              placeholder='Enter Delete'
              testID='deleteInput'
              inputType='boolean'
              onSubmitEditing={() => addRef.current?.focus()}
            />
            <FormField
              name='add'
              ref={addRef}
              label='Add'
              placeholder='Enter Add'
              testID='addInput'
              inputType='boolean'
              onSubmitEditing={() => levelRef.current?.focus()}
            />
            <FormField name='level' ref={levelRef} label='Level' placeholder='Enter Level' testID='levelInput' inputType='number' />
            <FormField
              name='baseInfo'
              inputType='select-one'
              ref={baseInfoRef}
              listItems={baseInfoList}
              listItemLabelField='id'
              label='Base Info'
              placeholder='Select Base Info'
              testID='baseInfoSelectInput'
            />
            <FormField
              name='owner'
              inputType='select-one'
              ref={ownerRef}
              listItems={masterUserList}
              listItemLabelField='id'
              label='Owner'
              placeholder='Select Owner'
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
    read: value.read ?? null,
    write: value.write ?? null,
    share: value.share ?? null,
    delete: value.delete ?? null,
    add: value.add ?? null,
    level: value.level ?? null,
    baseInfo: value.baseInfo && value.baseInfo.id ? value.baseInfo.id : null,
    owner: value.owner && value.owner.id ? value.owner.id : null,
  };
};
const formValueToEntity = (value) =>
{
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    read: value.read === null ? false : Boolean(value.read),
    write: value.write === null ? false : Boolean(value.write),
    share: value.share === null ? false : Boolean(value.share),
    delete: value.delete === null ? false : Boolean(value.delete),
    add: value.add === null ? false : Boolean(value.add),
    level: value.level ?? null,
  };
  entity.baseInfo = value.baseInfo ? {id: value.baseInfo} : null;
  entity.owner = value.owner ? {id: value.owner} : null;
  return entity;
};

const mapStateToProps = (state) =>
{
  return {
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    masterUserList: state.masterUsers.masterUserList ?? [],
    permission: state.permissions.permission,
    fetching: state.permissions.fetchingOne,
    updating: state.permissions.updating,
    updateSuccess: state.permissions.updateSuccess,
    errorUpdating: state.permissions.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getAllMasterUsers: (options) => dispatch(MasterUserActions.masterUserAllRequest(options)),
    getPermission: (id) => dispatch(PermissionActions.permissionRequest(id)),
    getAllPermissions: (options) => dispatch(PermissionActions.permissionAllRequest(options)),
    updatePermission: (permission) => dispatch(PermissionActions.permissionUpdateRequest(permission)),
    reset: () => dispatch(PermissionActions.permissionReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PermissionEditScreen);
