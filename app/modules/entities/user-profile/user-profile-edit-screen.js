import React, {createRef} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';

import UserProfileActions from './user-profile.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import {useDidUpdateEffect} from '../../../shared/util/use-did-update-effect';
import styles from './user-profile-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
});

function UserProfileEditScreen(props)
{
  const {
    getUserProfile,
    updateUserProfile,
    route,
    userProfile,
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
      getUserProfile(route.params.entityId);
    }
    else
    {
      reset();
    }
  }, [isNewEntity, getUserProfile, route, reset]);

  React.useEffect(() =>
  {
    if (isNewEntity)
    {
      setFormValue(entityToFormValue({}));
    }
    else if (!fetching)
    {
      setFormValue(entityToFormValue(userProfile));
    }
  }, [userProfile, fetching, isNewEntity]);

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
        isNewEntity || !navigation.canGoBack() ? navigation.replace('UserProfileDetail', {entityId: userProfile?.id}) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateUserProfile(formValueToEntity(data));

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
  const workRef = createRef();
  const educationRef = createRef();
  const placesLivedRef = createRef();
  const contactInfoRef = createRef();
  const webSocialLinksRef = createRef();
  const basicInfoRef = createRef();
  const relationshipInfoRef = createRef();
  const familyRef = createRef();
  const detailAboutRef = createRef();
  const lifeEventsRef = createRef();
  const hobbiesRef = createRef();
  const featuredRef = createRef();
  const infoRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID='userProfileEditScrollView'
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
              onSubmitEditing={() => workRef.current?.focus()}
            />
            <FormField
              name='work'
              ref={workRef}
              label='Work'
              placeholder='Enter Work'
              testID='workInput'
              onSubmitEditing={() => educationRef.current?.focus()}
            />
            <FormField
              name='education'
              ref={educationRef}
              label='Education'
              placeholder='Enter Education'
              testID='educationInput'
              onSubmitEditing={() => placesLivedRef.current?.focus()}
            />
            <FormField
              name='placesLived'
              ref={placesLivedRef}
              label='Places Lived'
              placeholder='Enter Places Lived'
              testID='placesLivedInput'
              onSubmitEditing={() => contactInfoRef.current?.focus()}
            />
            <FormField
              name='contactInfo'
              ref={contactInfoRef}
              label='Contact Info'
              placeholder='Enter Contact Info'
              testID='contactInfoInput'
              onSubmitEditing={() => webSocialLinksRef.current?.focus()}
            />
            <FormField
              name='webSocialLinks'
              ref={webSocialLinksRef}
              label='Web Social Links'
              placeholder='Enter Web Social Links'
              testID='webSocialLinksInput'
              onSubmitEditing={() => basicInfoRef.current?.focus()}
            />
            <FormField
              name='basicInfo'
              ref={basicInfoRef}
              label='Basic Info'
              placeholder='Enter Basic Info'
              testID='basicInfoInput'
              onSubmitEditing={() => relationshipInfoRef.current?.focus()}
            />
            <FormField
              name='relationshipInfo'
              ref={relationshipInfoRef}
              label='Relationship Info'
              placeholder='Enter Relationship Info'
              testID='relationshipInfoInput'
              onSubmitEditing={() => familyRef.current?.focus()}
            />
            <FormField
              name='family'
              ref={familyRef}
              label='Family'
              placeholder='Enter Family'
              testID='familyInput'
              onSubmitEditing={() => detailAboutRef.current?.focus()}
            />
            <FormField
              name='detailAbout'
              ref={detailAboutRef}
              label='Detail About'
              placeholder='Enter Detail About'
              testID='detailAboutInput'
              onSubmitEditing={() => lifeEventsRef.current?.focus()}
            />
            <FormField
              name='lifeEvents'
              ref={lifeEventsRef}
              label='Life Events'
              placeholder='Enter Life Events'
              testID='lifeEventsInput'
              onSubmitEditing={() => hobbiesRef.current?.focus()}
            />
            <FormField
              name='hobbies'
              ref={hobbiesRef}
              label='Hobbies'
              placeholder='Enter Hobbies'
              testID='hobbiesInput'
              onSubmitEditing={() => featuredRef.current?.focus()}
            />
            <FormField name='featured' ref={featuredRef} label='Featured' placeholder='Enter Featured' testID='featuredInput' />
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
    work: value.work ?? null,
    education: value.education ?? null,
    placesLived: value.placesLived ?? null,
    contactInfo: value.contactInfo ?? null,
    webSocialLinks: value.webSocialLinks ?? null,
    basicInfo: value.basicInfo ?? null,
    relationshipInfo: value.relationshipInfo ?? null,
    family: value.family ?? null,
    detailAbout: value.detailAbout ?? null,
    lifeEvents: value.lifeEvents ?? null,
    hobbies: value.hobbies ?? null,
    featured: value.featured ?? null,
    info: value.info && value.info.id ? value.info.id : null,
  };
};
const formValueToEntity = (value) =>
{
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    work: value.work ?? null,
    education: value.education ?? null,
    placesLived: value.placesLived ?? null,
    contactInfo: value.contactInfo ?? null,
    webSocialLinks: value.webSocialLinks ?? null,
    basicInfo: value.basicInfo ?? null,
    relationshipInfo: value.relationshipInfo ?? null,
    family: value.family ?? null,
    detailAbout: value.detailAbout ?? null,
    lifeEvents: value.lifeEvents ?? null,
    hobbies: value.hobbies ?? null,
    featured: value.featured ?? null,
  };
  entity.info = value.info ? {id: value.info} : null;
  return entity;
};

const mapStateToProps = (state) =>
{
  return {
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    userProfile: state.userProfiles.userProfile,
    fetching: state.userProfiles.fetchingOne,
    updating: state.userProfiles.updating,
    updateSuccess: state.userProfiles.updateSuccess,
    errorUpdating: state.userProfiles.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getUserProfile: (id) => dispatch(UserProfileActions.userProfileRequest(id)),
    getAllUserProfiles: (options) => dispatch(UserProfileActions.userProfileAllRequest(options)),
    updateUserProfile: (userProfile) => dispatch(UserProfileActions.userProfileUpdateRequest(userProfile)),
    reset: () => dispatch(UserProfileActions.userProfileReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileEditScreen);
