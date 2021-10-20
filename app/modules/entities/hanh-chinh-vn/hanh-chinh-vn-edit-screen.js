import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import HanhChinhVNActions from './hanh-chinh-vn.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './hanh-chinh-vn-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  slug: Yup.string().required(),
  type: Yup.string().required(),
  nameWithType: Yup.string().required(),
  code: Yup.string().required(),
  parentCode: Yup.string().required(),
});

function HanhChinhVNEditScreen(props) {
  const { getHanhChinhVN, updateHanhChinhVN, route, hanhChinhVN, fetching, updating, errorUpdating, updateSuccess, navigation, reset } =
    props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getHanhChinhVN(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getHanhChinhVN, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(hanhChinhVN));
    }
  }, [hanhChinhVN, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {}, []);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('HanhChinhVNDetail', { entityId: hanhChinhVN?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateHanhChinhVN(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const nameRef = createRef();
  const slugRef = createRef();
  const typeRef = createRef();
  const nameWithTypeRef = createRef();
  const codeRef = createRef();
  const parentCodeRef = createRef();
  const pathRef = createRef();
  const pathWithTypeRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="hanhChinhVNEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="name"
              ref={nameRef}
              label="Name"
              placeholder="Enter Name"
              testID="nameInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => slugRef.current?.focus()}
            />
            <FormField
              name="slug"
              ref={slugRef}
              label="Slug"
              placeholder="Enter Slug"
              testID="slugInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => typeRef.current?.focus()}
            />
            <FormField
              name="type"
              ref={typeRef}
              label="Type"
              placeholder="Enter Type"
              testID="typeInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => nameWithTypeRef.current?.focus()}
            />
            <FormField
              name="nameWithType"
              ref={nameWithTypeRef}
              label="Name With Type"
              placeholder="Enter Name With Type"
              testID="nameWithTypeInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => codeRef.current?.focus()}
            />
            <FormField
              name="code"
              ref={codeRef}
              label="Code"
              placeholder="Enter Code"
              testID="codeInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => parentCodeRef.current?.focus()}
            />
            <FormField
              name="parentCode"
              ref={parentCodeRef}
              label="Parent Code"
              placeholder="Enter Parent Code"
              testID="parentCodeInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => pathRef.current?.focus()}
            />
            <FormField
              name="path"
              ref={pathRef}
              label="Path"
              placeholder="Enter Path"
              testID="pathInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => pathWithTypeRef.current?.focus()}
            />
            <FormField
              name="pathWithType"
              ref={pathWithTypeRef}
              label="Path With Type"
              placeholder="Enter Path With Type"
              testID="pathWithTypeInput"
              inputType="text"
              autoCapitalize="none"
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
const entityToFormValue = (value) => {
  if (!value) {
    return {};
  }
  return {
    id: value.id ?? null,
    name: value.name ?? null,
    slug: value.slug ?? null,
    type: value.type ?? null,
    nameWithType: value.nameWithType ?? null,
    code: value.code ?? null,
    parentCode: value.parentCode ?? null,
    path: value.path ?? null,
    pathWithType: value.pathWithType ?? null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    name: value.name ?? null,
    slug: value.slug ?? null,
    type: value.type ?? null,
    nameWithType: value.nameWithType ?? null,
    code: value.code ?? null,
    parentCode: value.parentCode ?? null,
    path: value.path ?? null,
    pathWithType: value.pathWithType ?? null,
  };
  return entity;
};

const mapStateToProps = (state) => {
  return {
    hanhChinhVN: state.hanhChinhVNS.hanhChinhVN,
    fetching: state.hanhChinhVNS.fetchingOne,
    updating: state.hanhChinhVNS.updating,
    updateSuccess: state.hanhChinhVNS.updateSuccess,
    errorUpdating: state.hanhChinhVNS.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHanhChinhVN: (id) => dispatch(HanhChinhVNActions.hanhChinhVNRequest(id)),
    getAllHanhChinhVNS: (options) => dispatch(HanhChinhVNActions.hanhChinhVNAllRequest(options)),
    updateHanhChinhVN: (hanhChinhVN) => dispatch(HanhChinhVNActions.hanhChinhVNUpdateRequest(hanhChinhVN)),
    reset: () => dispatch(HanhChinhVNActions.hanhChinhVNReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HanhChinhVNEditScreen);
