import React, {createRef} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';

import PostActions from './post.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import GroupPostActions from '../group-post/group-post.reducer';
import PagePostActions from '../page-post/page-post.reducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import {useDidUpdateEffect} from '../../../shared/util/use-did-update-effect';
import styles from './post-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
});

const PostInType = [
  {
    label: 'GROUP',
    value: 'GROUP',
  },
  {
    label: 'USER',
    value: 'USER',
  },
  {
    label: 'PAGE',
    value: 'PAGE',
  },
];
const PostType = [
  {
    label: 'SIMPLE',
    value: 'SIMPLE',
  },
  {
    label: 'ADVANCE',
    value: 'ADVANCE',
  },
  {
    label: 'FROALA',
    value: 'FROALA',
  },
];

function PostEditScreen(props)
{
  const {
    getPost,
    updatePost,
    route,
    post,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllBaseInfos,
    baseInfoList,
    getAllGroupPosts,
    groupPostList,
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
      getPost(route.params.entityId);
    }
    else
    {
      reset();
    }
  }, [isNewEntity, getPost, route, reset]);

  React.useEffect(() =>
  {
    if (isNewEntity)
    {
      setFormValue(entityToFormValue({}));
    }
    else if (!fetching)
    {
      setFormValue(entityToFormValue(post));
    }
  }, [post, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() =>
  {
    getAllBaseInfos();
    getAllGroupPosts();
    getAllPagePosts();
  }, [getAllBaseInfos, getAllGroupPosts, getAllPagePosts]);

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
        isNewEntity || !navigation.canGoBack() ? navigation.replace('PostDetail', {entityId: post?.id}) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updatePost(formValueToEntity(data));

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
  const postInTypeRef = createRef();
  const postTypeRef = createRef();
  const contentRef = createRef();
  const searchFieldRef = createRef();
  const infoRef = createRef();
  const groupRef = createRef();
  const pageRef = createRef();
  const parentRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID='postEditScrollView'
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
              onSubmitEditing={() => postInTypeRef.current?.focus()}
            />
            <FormField
              name='postInType'
              ref={postInTypeRef}
              label='Post In Type'
              placeholder='Enter Post In Type'
              testID='postInTypeInput'
              inputType='select-one'
              listItems={PostInType}
              onSubmitEditing={() => postTypeRef.current?.focus()}
            />
            <FormField
              name='postType'
              ref={postTypeRef}
              label='Post Type'
              placeholder='Enter Post Type'
              testID='postTypeInput'
              inputType='select-one'
              listItems={PostType}
              onSubmitEditing={() => contentRef.current?.focus()}
            />
            <FormField
              name='content'
              ref={contentRef}
              label='Content'
              placeholder='Enter Content'
              testID='contentInput'
              onSubmitEditing={() => searchFieldRef.current?.focus()}
            />
            <FormField
              name='searchField'
              ref={searchFieldRef}
              label='Search Field'
              placeholder='Enter Search Field'
              testID='searchFieldInput'
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
            <FormField
              name='group'
              inputType='select-one'
              ref={groupRef}
              listItems={groupPostList}
              listItemLabelField='id'
              label='Group'
              placeholder='Select Group'
              testID='groupPostSelectInput'
            />
            <FormField
              name='page'
              inputType='select-one'
              ref={pageRef}
              listItems={pagePostList}
              listItemLabelField='id'
              label='Page'
              placeholder='Select Page'
              testID='pagePostSelectInput'
            />
            <FormField
              name='parent'
              inputType='select-one'
              ref={parentRef}
              listItems={postList}
              listItemLabelField='id'
              label='Parent'
              placeholder='Select Parent'
              testID='postSelectInput'
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
    postInType: value.postInType ?? null,
    postType: value.postType ?? null,
    content: value.content ?? null,
    searchField: value.searchField ?? null,
    info: value.info && value.info.id ? value.info.id : null,
    group: value.group && value.group.id ? value.group.id : null,
    page: value.page && value.page.id ? value.page.id : null,
    parent: value.parent && value.parent.id ? value.parent.id : null,
  };
};
const formValueToEntity = (value) =>
{
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    postInType: value.postInType ?? null,
    postType: value.postType ?? null,
    content: value.content ?? null,
    searchField: value.searchField ?? null,
  };
  entity.info = value.info ? {id: value.info} : null;
  entity.group = value.group ? {id: value.group} : null;
  entity.page = value.page ? {id: value.page} : null;
  entity.parent = value.parent ? {id: value.parent} : null;
  return entity;
};

const mapStateToProps = (state) =>
{
  return {
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    groupPostList: state.groupPosts.groupPostList ?? [],
    pagePostList: state.pagePosts.pagePostList ?? [],
    post: state.posts.post,
    fetching: state.posts.fetchingOne,
    updating: state.posts.updating,
    updateSuccess: state.posts.updateSuccess,
    errorUpdating: state.posts.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getAllGroupPosts: (options) => dispatch(GroupPostActions.groupPostAllRequest(options)),
    getAllPagePosts: (options) => dispatch(PagePostActions.pagePostAllRequest(options)),
    getPost: (id) => dispatch(PostActions.postRequest(id)),
    getAllPosts: (options) => dispatch(PostActions.postAllRequest(options)),
    updatePost: (post) => dispatch(PostActions.postUpdateRequest(post)),
    reset: () => dispatch(PostActions.postReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostEditScreen);
