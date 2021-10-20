import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import PostCommentActions from './post-comment.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import PostActions from '../post/post.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './post-comment-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
});

function PostCommentEditScreen(props) {
  const {
    getPostComment,
    updatePostComment,
    route,
    postComment,
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
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getPostComment(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getPostComment, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(postComment));
    }
  }, [postComment, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllBaseInfos();
    getAllPosts();
  }, [getAllBaseInfos, getAllPosts]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('PostCommentDetail', { entityId: postComment?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updatePostComment(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const uuidRef = createRef();
  const contentRef = createRef();
  const infoRef = createRef();
  const postRef = createRef();
  const parentRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="postCommentEditScrollView"
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
              onSubmitEditing={() => contentRef.current?.focus()}
            />
            <FormField name="content" ref={contentRef} label="Content" placeholder="Enter Content" testID="contentInput" />
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
            <FormField
              name="post"
              inputType="select-one"
              ref={postRef}
              listItems={postList}
              listItemLabelField="id"
              label="Post"
              placeholder="Select Post"
              testID="postSelectInput"
            />
            <FormField
              name="parent"
              inputType="select-one"
              ref={parentRef}
              listItems={postCommentList}
              listItemLabelField="id"
              label="Parent"
              placeholder="Select Parent"
              testID="postCommentSelectInput"
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
    content: value.content ?? null,
    info: value.info && value.info.id ? value.info.id : null,
    post: value.post && value.post.id ? value.post.id : null,
    parent: value.parent && value.parent.id ? value.parent.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    content: value.content ?? null,
  };
  entity.info = value.info ? { id: value.info } : null;
  entity.post = value.post ? { id: value.post } : null;
  entity.parent = value.parent ? { id: value.parent } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    postList: state.posts.postList ?? [],
    postComment: state.postComments.postComment,
    fetching: state.postComments.fetchingOne,
    updating: state.postComments.updating,
    updateSuccess: state.postComments.updateSuccess,
    errorUpdating: state.postComments.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getAllPosts: (options) => dispatch(PostActions.postAllRequest(options)),
    getPostComment: (id) => dispatch(PostCommentActions.postCommentRequest(id)),
    getAllPostComments: (options) => dispatch(PostCommentActions.postCommentAllRequest(options)),
    updatePostComment: (postComment) => dispatch(PostCommentActions.postCommentUpdateRequest(postComment)),
    reset: () => dispatch(PostCommentActions.postCommentReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCommentEditScreen);
