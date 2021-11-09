import React, {createRef} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';

import FollowPageActions from './follow-page.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import PagePostActions from '../page-post/page-post.reducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import {useDidUpdateEffect} from '../../../shared/util/use-did-update-effect';
import styles from './follow-page-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
});

function FollowPageEditScreen(props)
{
  const {
    getFollowPage,
    updateFollowPage,
    route,
    followPage,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllBaseInfos,
    baseInfoList,
    getAllPagePosts,
    pagePostList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() =>
  {
    if (!isNewEntity)
    {
      getFollowPage(route.params.entityId);
    }
    else
    {
      reset();
    }
  }, [isNewEntity, getFollowPage, route, reset]);

  React.useEffect(() =>
  {
    if (isNewEntity)
    {
      setFormValue(entityToFormValue({}));
    }
    else if (!fetching)
    {
      setFormValue(entityToFormValue(followPage));
    }
  }, [followPage, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() =>
  {
    getAllBaseInfos();
    getAllPagePosts();
  }, [getAllBaseInfos, getAllPagePosts]);

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
        isNewEntity || !navigation.canGoBack() ? navigation.replace('FollowPageDetail', {entityId: followPage?.id}) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateFollowPage(formValueToEntity(data));

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
  const pageDetailsRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID='followPageEditScrollView'
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
              name='pageDetails'
              inputType='select-one'
              ref={pageDetailsRef}
              listItems={pagePostList}
              listItemLabelField='id'
              label='Page Details'
              placeholder='Select Page Details'
              testID='pagePostSelectInput'
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
    pageDetails: value.pageDetails && value.pageDetails.id ? value.pageDetails.id : null,
  };
};
const formValueToEntity = (value) =>
{
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
  };
  entity.info = value.info ? {id: value.info} : null;
  entity.pageDetails = value.pageDetails ? {id: value.pageDetails} : null;
  return entity;
};

const mapStateToProps = (state) =>
{
  return {
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    pagePostList: state.pagePosts.pagePostList ?? [],
    followPage: state.followPages.followPage,
    fetching: state.followPages.fetchingOne,
    updating: state.followPages.updating,
    updateSuccess: state.followPages.updateSuccess,
    errorUpdating: state.followPages.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getAllPagePosts: (options) => dispatch(PagePostActions.pagePostAllRequest(options)),
    getFollowPage: (id) => dispatch(FollowPageActions.followPageRequest(id)),
    getAllFollowPages: (options) => dispatch(FollowPageActions.followPageAllRequest(options)),
    updateFollowPage: (followPage) => dispatch(FollowPageActions.followPageUpdateRequest(followPage)),
    reset: () => dispatch(FollowPageActions.followPageReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowPageEditScreen);
