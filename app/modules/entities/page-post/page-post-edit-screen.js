import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import PagePostActions from './page-post.reducer';
import PageProfileActions from '../page-profile/page-profile.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './page-post-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
  name: Yup.string().required(),
});

function PagePostEditScreen(props) {
  const {
    getPagePost,
    updatePagePost,
    route,
    pagePost,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllPageProfiles,
    pageProfileList,
    getAllBaseInfos,
    baseInfoList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getPagePost(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getPagePost, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(pagePost));
    }
  }, [pagePost, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllPageProfiles();
    getAllBaseInfos();
  }, [getAllPageProfiles, getAllBaseInfos]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('PagePostDetail', { entityId: pagePost?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updatePagePost(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const uuidRef = createRef();
  const nameRef = createRef();
  const avatarRef = createRef();
  const quickInfoRef = createRef();
  const profileRef = createRef();
  const infoRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="pagePostEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="uuid"
              ref={uuidRef}
              label="Uuid"
              placeholder="Enter Uuid"
              testID="uuidInput"
              onSubmitEditing={() => nameRef.current?.focus()}
            />
            <FormField
              name="name"
              ref={nameRef}
              label="Name"
              placeholder="Enter Name"
              testID="nameInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => avatarRef.current?.focus()}
            />
            <FormField
              name="avatar"
              ref={avatarRef}
              label="Avatar"
              placeholder="Enter Avatar"
              testID="avatarInput"
              onSubmitEditing={() => quickInfoRef.current?.focus()}
            />
            <FormField name="quickInfo" ref={quickInfoRef} label="Quick Info" placeholder="Enter Quick Info" testID="quickInfoInput" />
            <FormField
              name="profile"
              inputType="select-one"
              ref={profileRef}
              listItems={pageProfileList}
              listItemLabelField="id"
              label="Profile"
              placeholder="Select Profile"
              testID="pageProfileSelectInput"
            />
            <FormField
              name="info"
              inputType="select-one"
              ref={infoRef}
              listItems={baseInfoList}
              listItemLabelField="id"
              label="Info"
              placeholder="Select Info"
              testID="baseInfoSelectInput"
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
    uuid: value.uuid ?? null,
    name: value.name ?? null,
    avatar: value.avatar ?? null,
    quickInfo: value.quickInfo ?? null,
    profile: value.profile && value.profile.id ? value.profile.id : null,
    info: value.info && value.info.id ? value.info.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    name: value.name ?? null,
    avatar: value.avatar ?? null,
    quickInfo: value.quickInfo ?? null,
  };
  entity.profile = value.profile ? { id: value.profile } : null;
  entity.info = value.info ? { id: value.info } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    pageProfileList: state.pageProfiles.pageProfileList ?? [],
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    pagePost: state.pagePosts.pagePost,
    fetching: state.pagePosts.fetchingOne,
    updating: state.pagePosts.updating,
    updateSuccess: state.pagePosts.updateSuccess,
    errorUpdating: state.pagePosts.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPageProfiles: (options) => dispatch(PageProfileActions.pageProfileAllRequest(options)),
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getPagePost: (id) => dispatch(PagePostActions.pagePostRequest(id)),
    getAllPagePosts: (options) => dispatch(PagePostActions.pagePostAllRequest(options)),
    updatePagePost: (pagePost) => dispatch(PagePostActions.pagePostUpdateRequest(pagePost)),
    reset: () => dispatch(PagePostActions.pagePostReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PagePostEditScreen);
