import React, {createRef} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';

import ClassInfoActions from './class-info.reducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import {useDidUpdateEffect} from '../../../shared/util/use-did-update-effect';
import styles from './class-info-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
  fullName: Yup.string().required(),
});

function ClassInfoEditScreen(props)
{
  const {getClassInfo, updateClassInfo, route, classInfo, fetching, updating, errorUpdating, updateSuccess, navigation, reset} = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() =>
  {
    if (!isNewEntity)
    {
      getClassInfo(route.params.entityId);
    }
    else
    {
      reset();
    }
  }, [isNewEntity, getClassInfo, route, reset]);

  React.useEffect(() =>
  {
    if (isNewEntity)
    {
      setFormValue(entityToFormValue({}));
    }
    else if (!fetching)
    {
      setFormValue(entityToFormValue(classInfo));
    }
  }, [classInfo, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() =>
  {
  }, []);

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
        isNewEntity || !navigation.canGoBack() ? navigation.replace('ClassInfoDetail', {entityId: classInfo?.id}) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateClassInfo(formValueToEntity(data));

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
  const namePackageRef = createRef();
  const fullNameRef = createRef();
  const classNameRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID='classInfoEditScrollView'
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
              onSubmitEditing={() => namePackageRef.current?.focus()}
            />
            <FormField
              name='namePackage'
              ref={namePackageRef}
              label='Name Package'
              placeholder='Enter Name Package'
              testID='namePackageInput'
              inputType='text'
              autoCapitalize='none'
              onSubmitEditing={() => fullNameRef.current?.focus()}
            />
            <FormField
              name='fullName'
              ref={fullNameRef}
              label='Full Name'
              placeholder='Enter Full Name'
              testID='fullNameInput'
              inputType='text'
              autoCapitalize='none'
              onSubmitEditing={() => classNameRef.current?.focus()}
            />
            <FormField
              name='className'
              ref={classNameRef}
              label='Class Name'
              placeholder='Enter Class Name'
              testID='classNameInput'
              inputType='text'
              autoCapitalize='none'
              onSubmitEditing={() => formRef.current?.submitForm()}
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
    namePackage: value.namePackage ?? null,
    fullName: value.fullName ?? null,
    className: value.className ?? null,
  };
};
const formValueToEntity = (value) =>
{
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    namePackage: value.namePackage ?? null,
    fullName: value.fullName ?? null,
    className: value.className ?? null,
  };
  return entity;
};

const mapStateToProps = (state) =>
{
  return {
    classInfo: state.classInfos.classInfo,
    fetching: state.classInfos.fetchingOne,
    updating: state.classInfos.updating,
    updateSuccess: state.classInfos.updateSuccess,
    errorUpdating: state.classInfos.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getClassInfo: (id) => dispatch(ClassInfoActions.classInfoRequest(id)),
    getAllClassInfos: (options) => dispatch(ClassInfoActions.classInfoAllRequest(options)),
    updateClassInfo: (classInfo) => dispatch(ClassInfoActions.classInfoUpdateRequest(classInfo)),
    reset: () => dispatch(ClassInfoActions.classInfoReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassInfoEditScreen);
