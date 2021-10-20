import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import PostLikeActions from './post-like.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import PostActions from '../post/post.reducer';
import PostCommentActions from '../post-comment/post-comment.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './post-like-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
});

function PostLikeEditScreen(props) {
  const {
    getPostLike,
    updatePostLike,
    route,
    postLike,
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
    getAllPostComments,
    postCommentList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getPostLike(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getPostLike, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(postLike));
    }
  }, [postLike, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllBaseInfos();
    getAllPosts();
    getAllPostComments();
  }, [getAllBaseInfos, getAllPosts, getAllPostComments]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('PostLikeDetail', { entityId: postLike?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updatePostLike(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const uuidRef = createRef();
  const infoRef = createRef();
  const postRef = createRef();
  const commentRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="postLikeEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField name="uuid" ref={uuidRef} label="Uuid" placeholder="Enter Uuid" testID="uuidInput" />
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
              name="comment"
              inputType="select-one"
              ref={commentRef}
              listItems={postCommentList}
              listItemLabelField="id"
              label="Comment"
              placeholder="Select Comment"
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
    info: value.info && value.info.id ? value.info.id : null,
    post: value.post && value.post.id ? value.post.id : null,
    comment: value.comment && value.comment.id ? value.comment.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
  };
  entity.info = value.info ? { id: value.info } : null;
  entity.post = value.post ? { id: value.post } : null;
  entity.comment = value.comment ? { id: value.comment } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    postList: state.posts.postList ?? [],
    postCommentList: state.postComments.postCommentList ?? [],
    postLike: state.postLikes.postLike,
    fetching: state.postLikes.fetchingOne,
    updating: state.postLikes.updating,
    updateSuccess: state.postLikes.updateSuccess,
    errorUpdating: state.postLikes.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getAllPosts: (options) => dispatch(PostActions.postAllRequest(options)),
    getAllPostComments: (options) => dispatch(PostCommentActions.postCommentAllRequest(options)),
    getPostLike: (id) => dispatch(PostLikeActions.postLikeRequest(id)),
    getAllPostLikes: (options) => dispatch(PostLikeActions.postLikeAllRequest(options)),
    updatePostLike: (postLike) => dispatch(PostLikeActions.postLikeUpdateRequest(postLike)),
    reset: () => dispatch(PostLikeActions.postLikeReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostLikeEditScreen);
