import React, {createRef} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';

import TopicInterestActions from './topic-interest.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import PostActions from '../post/post.reducer';
import PagePostActions from '../page-post/page-post.reducer';
import GroupPostActions from '../group-post/group-post.reducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import {useDidUpdateEffect} from '../../../shared/util/use-did-update-effect';
import styles from './topic-interest-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
});

function TopicInterestEditScreen(props)
{
  const {
    getTopicInterest,
    updateTopicInterest,
    route,
    topicInterest,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllBaseInfos,
    baseInfoList,
    getAllPosts,
    postList,
    getAllPagePosts,
    pagePostList,
    getAllGroupPosts,
    groupPostList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() =>
  {
    if (!isNewEntity)
    {
      getTopicInterest(route.params.entityId);
    }
    else
    {
      reset();
    }
  }, [isNewEntity, getTopicInterest, route, reset]);

  React.useEffect(() =>
  {
    if (isNewEntity)
    {
      setFormValue(entityToFormValue({}));
    }
    else if (!fetching)
    {
      setFormValue(entityToFormValue(topicInterest));
    }
  }, [topicInterest, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() =>
  {
    getAllBaseInfos();
    getAllPosts();
    getAllPagePosts();
    getAllGroupPosts();
  }, [getAllBaseInfos, getAllPosts, getAllPagePosts, getAllGroupPosts]);

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
        isNewEntity || !navigation.canGoBack()
          ? navigation.replace('TopicInterestDetail', {entityId: topicInterest?.id})
          : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateTopicInterest(formValueToEntity(data));

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
  const titleRef = createRef();
  const contentRef = createRef();
  const infoRef = createRef();
  const postsRef = createRef();
  const pagePostsRef = createRef();
  const groupPostsRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID='topicInterestEditScrollView'
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
              onSubmitEditing={() => titleRef.current?.focus()}
            />
            <FormField
              name='title'
              ref={titleRef}
              label='Title'
              placeholder='Enter Title'
              testID='titleInput'
              inputType='text'
              autoCapitalize='none'
              onSubmitEditing={() => contentRef.current?.focus()}
            />
            <FormField name='content' ref={contentRef} label='Content' placeholder='Enter Content' testID='contentInput' />
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
              name='posts'
              inputType='select-multiple'
              ref={postsRef}
              listItems={postList}
              listItemLabelField='id'
              label='Post'
              placeholder='Select Post'
              testID='postSelectInput'
            />
            <FormField
              name='pagePosts'
              inputType='select-multiple'
              ref={pagePostsRef}
              listItems={pagePostList}
              listItemLabelField='id'
              label='Page Post'
              placeholder='Select Page Post'
              testID='pagePostSelectInput'
            />
            <FormField
              name='groupPosts'
              inputType='select-multiple'
              ref={groupPostsRef}
              listItems={groupPostList}
              listItemLabelField='id'
              label='Group Post'
              placeholder='Select Group Post'
              testID='groupPostSelectInput'
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
    title: value.title ?? null,
    content: value.content ?? null,
    info: value.info && value.info.id ? value.info.id : null,
    posts: value.posts?.map((i) => i.id),
    pagePosts: value.pagePosts?.map((i) => i.id),
    groupPosts: value.groupPosts?.map((i) => i.id),
  };
};
const formValueToEntity = (value) =>
{
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    title: value.title ?? null,
    content: value.content ?? null,
  };
  entity.info = value.info ? {id: value.info} : null;
  entity.posts = value.posts.map((id) => ({id}));
  entity.pagePosts = value.pagePosts.map((id) => ({id}));
  entity.groupPosts = value.groupPosts.map((id) => ({id}));
  return entity;
};

const mapStateToProps = (state) =>
{
  return {
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    postList: state.posts.postList ?? [],
    pagePostList: state.pagePosts.pagePostList ?? [],
    groupPostList: state.groupPosts.groupPostList ?? [],
    topicInterest: state.topicInterests.topicInterest,
    fetching: state.topicInterests.fetchingOne,
    updating: state.topicInterests.updating,
    updateSuccess: state.topicInterests.updateSuccess,
    errorUpdating: state.topicInterests.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getAllPosts: (options) => dispatch(PostActions.postAllRequest(options)),
    getAllPagePosts: (options) => dispatch(PagePostActions.pagePostAllRequest(options)),
    getAllGroupPosts: (options) => dispatch(GroupPostActions.groupPostAllRequest(options)),
    getTopicInterest: (id) => dispatch(TopicInterestActions.topicInterestRequest(id)),
    getAllTopicInterests: (options) => dispatch(TopicInterestActions.topicInterestAllRequest(options)),
    updateTopicInterest: (topicInterest) => dispatch(TopicInterestActions.topicInterestUpdateRequest(topicInterest)),
    reset: () => dispatch(TopicInterestActions.topicInterestReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicInterestEditScreen);
