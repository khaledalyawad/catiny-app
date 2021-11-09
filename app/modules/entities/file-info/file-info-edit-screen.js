import React, {createRef} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';

import FileInfoActions from './file-info.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import {useDidUpdateEffect} from '../../../shared/util/use-did-update-effect';
import styles from './file-info-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
  path: Yup.string().max(1024),
});

function FileInfoEditScreen(props)
{
  const {
    getFileInfo,
    updateFileInfo,
    route,
    fileInfo,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllBaseInfos,
    baseInfoList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() =>
  {
    if (!isNewEntity)
    {
      getFileInfo(route.params.entityId);
    }
    else
    {
      reset();
    }
  }, [isNewEntity, getFileInfo, route, reset]);

  React.useEffect(() =>
  {
    if (isNewEntity)
    {
      setFormValue(entityToFormValue({}));
    }
    else if (!fetching)
    {
      setFormValue(entityToFormValue(fileInfo));
    }
  }, [fileInfo, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() =>
  {
    getAllBaseInfos();
  }, [getAllBaseInfos]);

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
        isNewEntity || !navigation.canGoBack() ? navigation.replace('FileInfoDetail', {entityId: fileInfo?.id}) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateFileInfo(formValueToEntity(data));

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
  const nameFileRef = createRef();
  const typeFileRef = createRef();
  const pathRef = createRef();
  const dataSizeRef = createRef();
  const infoRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID='fileInfoEditScrollView'
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
              onSubmitEditing={() => nameFileRef.current?.focus()}
            />
            <FormField
              name='nameFile'
              ref={nameFileRef}
              label='Name File'
              placeholder='Enter Name File'
              testID='nameFileInput'
              inputType='text'
              autoCapitalize='none'
              onSubmitEditing={() => typeFileRef.current?.focus()}
            />
            <FormField
              name='typeFile'
              ref={typeFileRef}
              label='Type File'
              placeholder='Enter Type File'
              testID='typeFileInput'
              inputType='text'
              autoCapitalize='none'
              onSubmitEditing={() => pathRef.current?.focus()}
            />
            <FormField
              name='path'
              ref={pathRef}
              label='Path'
              placeholder='Enter Path'
              testID='pathInput'
              inputType='text'
              autoCapitalize='none'
              onSubmitEditing={() => dataSizeRef.current?.focus()}
            />
            <FormField
              name='dataSize'
              ref={dataSizeRef}
              label='Data Size'
              placeholder='Enter Data Size'
              testID='dataSizeInput'
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
    nameFile: value.nameFile ?? null,
    typeFile: value.typeFile ?? null,
    path: value.path ?? null,
    dataSize: value.dataSize ?? null,
    info: value.info && value.info.id ? value.info.id : null,
  };
};
const formValueToEntity = (value) =>
{
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    nameFile: value.nameFile ?? null,
    typeFile: value.typeFile ?? null,
    path: value.path ?? null,
    dataSize: value.dataSize ?? null,
  };
  entity.info = value.info ? {id: value.info} : null;
  return entity;
};

const mapStateToProps = (state) =>
{
  return {
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    fileInfo: state.fileInfos.fileInfo,
    fetching: state.fileInfos.fetchingOne,
    updating: state.fileInfos.updating,
    updateSuccess: state.fileInfos.updateSuccess,
    errorUpdating: state.fileInfos.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getFileInfo: (id) => dispatch(FileInfoActions.fileInfoRequest(id)),
    getAllFileInfos: (options) => dispatch(FileInfoActions.fileInfoAllRequest(options)),
    updateFileInfo: (fileInfo) => dispatch(FileInfoActions.fileInfoUpdateRequest(fileInfo)),
    reset: () => dispatch(FileInfoActions.fileInfoReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileInfoEditScreen);
