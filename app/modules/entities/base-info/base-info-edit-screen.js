import React, {createRef} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';

import BaseInfoActions from './base-info.reducer';
import MasterUserActions from '../master-user/master-user.reducer';
import ClassInfoActions from '../class-info/class-info.reducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import {useDidUpdateEffect} from '../../../shared/util/use-did-update-effect';
import styles from './base-info-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
});

const ProcessStatus = [
  {
    label: 'NOT_PROCESSED',
    value: 'NOT_PROCESSED',
  },
  {
    label: 'PROCESSING',
    value: 'PROCESSING',
  },
  {
    label: 'PROCESSED',
    value: 'PROCESSED',
  },
  {
    label: 'NEED_PROCESS',
    value: 'NEED_PROCESS',
  },
  {
    label: 'NEED_PROCESS_NOW',
    value: 'NEED_PROCESS_NOW',
  },
  {
    label: 'NEED_HANDLE',
    value: 'NEED_HANDLE',
  },
  {
    label: 'NEED_HANDLE_NOW',
    value: 'NEED_HANDLE_NOW',
  },
  {
    label: 'ERROR',
    value: 'ERROR',
  },
  {
    label: 'DONE',
    value: 'DONE',
  },
];

function BaseInfoEditScreen(props)
{
  const {
    getBaseInfo,
    updateBaseInfo,
    route,
    baseInfo,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllMasterUsers,
    masterUserList,
    getAllClassInfos,
    classInfoList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() =>
  {
    if (!isNewEntity)
    {
      getBaseInfo(route.params.entityId);
    }
    else
    {
      reset();
    }
  }, [isNewEntity, getBaseInfo, route, reset]);

  React.useEffect(() =>
  {
    if (isNewEntity)
    {
      setFormValue(entityToFormValue({}));
    }
    else if (!fetching)
    {
      setFormValue(entityToFormValue(baseInfo));
    }
  }, [baseInfo, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() =>
  {
    getAllMasterUsers();
    getAllClassInfos();
  }, [getAllMasterUsers, getAllClassInfos]);

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
        isNewEntity || !navigation.canGoBack() ? navigation.replace('BaseInfoDetail', {entityId: baseInfo?.id}) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateBaseInfo(formValueToEntity(data));

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
  const processStatusRef = createRef();
  const modifiedClassRef = createRef();
  const createdDateRef = createRef();
  const modifiedDateRef = createRef();
  const notesRef = createRef();
  const deletedRef = createRef();
  const priorityIndexRef = createRef();
  const countUseRef = createRef();
  const createdByRef = createRef();
  const modifiedByRef = createRef();
  const ownerRef = createRef();
  const classInfoRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID='baseInfoEditScrollView'
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
              onSubmitEditing={() => processStatusRef.current?.focus()}
            />
            <FormField
              name='processStatus'
              ref={processStatusRef}
              label='Process Status'
              placeholder='Enter Process Status'
              testID='processStatusInput'
              inputType='select-one'
              listItems={ProcessStatus}
              onSubmitEditing={() => modifiedClassRef.current?.focus()}
            />
            <FormField
              name='modifiedClass'
              ref={modifiedClassRef}
              label='Modified Class'
              placeholder='Enter Modified Class'
              testID='modifiedClassInput'
              inputType='text'
              autoCapitalize='none'
              onSubmitEditing={() => createdDateRef.current?.focus()}
            />
            <FormField
              name='createdDate'
              ref={createdDateRef}
              label='Created Date'
              placeholder='Enter Created Date'
              testID='createdDateInput'
              inputType='datetime'
              onSubmitEditing={() => modifiedDateRef.current?.focus()}
            />
            <FormField
              name='modifiedDate'
              ref={modifiedDateRef}
              label='Modified Date'
              placeholder='Enter Modified Date'
              testID='modifiedDateInput'
              inputType='datetime'
              onSubmitEditing={() => notesRef.current?.focus()}
            />
            <FormField
              name='notes'
              ref={notesRef}
              label='Notes'
              placeholder='Enter Notes'
              testID='notesInput'
              onSubmitEditing={() => deletedRef.current?.focus()}
            />
            <FormField
              name='deleted'
              ref={deletedRef}
              label='Deleted'
              placeholder='Enter Deleted'
              testID='deletedInput'
              inputType='boolean'
              onSubmitEditing={() => priorityIndexRef.current?.focus()}
            />
            <FormField
              name='priorityIndex'
              ref={priorityIndexRef}
              label='Priority Index'
              placeholder='Enter Priority Index'
              testID='priorityIndexInput'
              inputType='number'
              onSubmitEditing={() => countUseRef.current?.focus()}
            />
            <FormField
              name='countUse'
              ref={countUseRef}
              label='Count Use'
              placeholder='Enter Count Use'
              testID='countUseInput'
              inputType='number'
            />
            <FormField
              name='createdBy'
              inputType='select-one'
              ref={createdByRef}
              listItems={masterUserList}
              listItemLabelField='id'
              label='Created By'
              placeholder='Select Created By'
              testID='masterUserSelectInput'
            />
            <FormField
              name='modifiedBy'
              inputType='select-one'
              ref={modifiedByRef}
              listItems={masterUserList}
              listItemLabelField='id'
              label='Modified By'
              placeholder='Select Modified By'
              testID='masterUserSelectInput'
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
            <FormField
              name='classInfo'
              inputType='select-one'
              ref={classInfoRef}
              listItems={classInfoList}
              listItemLabelField='id'
              label='Class Info'
              placeholder='Select Class Info'
              testID='classInfoSelectInput'
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
    processStatus: value.processStatus ?? null,
    modifiedClass: value.modifiedClass ?? null,
    createdDate: value.createdDate ?? null,
    modifiedDate: value.modifiedDate ?? null,
    notes: value.notes ?? null,
    deleted: value.deleted ?? null,
    priorityIndex: value.priorityIndex ?? null,
    countUse: value.countUse ?? null,
    createdBy: value.createdBy && value.createdBy.id ? value.createdBy.id : null,
    modifiedBy: value.modifiedBy && value.modifiedBy.id ? value.modifiedBy.id : null,
    owner: value.owner && value.owner.id ? value.owner.id : null,
    classInfo: value.classInfo && value.classInfo.id ? value.classInfo.id : null,
  };
};
const formValueToEntity = (value) =>
{
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    processStatus: value.processStatus ?? null,
    modifiedClass: value.modifiedClass ?? null,
    createdDate: value.createdDate ?? null,
    modifiedDate: value.modifiedDate ?? null,
    notes: value.notes ?? null,
    deleted: value.deleted === null ? false : Boolean(value.deleted),
    priorityIndex: value.priorityIndex ?? null,
    countUse: value.countUse ?? null,
  };
  entity.createdBy = value.createdBy ? {id: value.createdBy} : null;
  entity.modifiedBy = value.modifiedBy ? {id: value.modifiedBy} : null;
  entity.owner = value.owner ? {id: value.owner} : null;
  entity.classInfo = value.classInfo ? {id: value.classInfo} : null;
  return entity;
};

const mapStateToProps = (state) =>
{
  return {
    masterUserList: state.masterUsers.masterUserList ?? [],
    classInfoList: state.classInfos.classInfoList ?? [],
    baseInfo: state.baseInfos.baseInfo,
    fetching: state.baseInfos.fetchingOne,
    updating: state.baseInfos.updating,
    updateSuccess: state.baseInfos.updateSuccess,
    errorUpdating: state.baseInfos.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getAllMasterUsers: (options) => dispatch(MasterUserActions.masterUserAllRequest(options)),
    getAllClassInfos: (options) => dispatch(ClassInfoActions.classInfoAllRequest(options)),
    getBaseInfo: (id) => dispatch(BaseInfoActions.baseInfoRequest(id)),
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    updateBaseInfo: (baseInfo) => dispatch(BaseInfoActions.baseInfoUpdateRequest(baseInfo)),
    reset: () => dispatch(BaseInfoActions.baseInfoReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseInfoEditScreen);
