import React, {createRef} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';

import PageProfileActions from './page-profile.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import {useDidUpdateEffect} from '../../../shared/util/use-did-update-effect';
import styles from './page-profile-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
});

function PageProfileEditScreen(props)
{
  const {
    getPageProfile,
    updatePageProfile,
    route,
    pageProfile,
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
      getPageProfile(route.params.entityId);
    }
    else
    {
      reset();
    }
  }, [isNewEntity, getPageProfile, route, reset]);

  React.useEffect(() =>
  {
    if (isNewEntity)
    {
      setFormValue(entityToFormValue({}));
    }
    else if (!fetching)
    {
      setFormValue(entityToFormValue(pageProfile));
    }
  }, [pageProfile, fetching, isNewEntity]);

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
        isNewEntity || !navigation.canGoBack() ? navigation.replace('PageProfileDetail', {entityId: pageProfile?.id}) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updatePageProfile(formValueToEntity(data));

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

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID='pageProfileEditScrollView'
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
  };
};
const formValueToEntity = (value) =>
{
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
  };
  entity.info = value.info ? {id: value.info} : null;
  return entity;
};

const mapStateToProps = (state) =>
{
  return {
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    pageProfile: state.pageProfiles.pageProfile,
    fetching: state.pageProfiles.fetchingOne,
    updating: state.pageProfiles.updating,
    updateSuccess: state.pageProfiles.updateSuccess,
    errorUpdating: state.pageProfiles.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getPageProfile: (id) => dispatch(PageProfileActions.pageProfileRequest(id)),
    getAllPageProfiles: (options) => dispatch(PageProfileActions.pageProfileAllRequest(options)),
    updatePageProfile: (pageProfile) => dispatch(PageProfileActions.pageProfileUpdateRequest(pageProfile)),
    reset: () => dispatch(PageProfileActions.pageProfileReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageProfileEditScreen);
