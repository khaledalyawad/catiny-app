import React from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import PostCommentActions from './post-comment.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import PostCommentDeleteModal from './post-comment-delete-modal';
import styles from './post-comment-styles';

function PostCommentDetailScreen(props)
{
  const {route, getPostComment, navigation, postComment, fetching, error} = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = postComment?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() =>
    {
      if (!routeEntityId)
      {
        navigation.navigate('PostComment');
      }
      else
      {
        setDeleteModalVisible(false);
        getPostComment(routeEntityId);
      }
    }, [routeEntityId, getPostComment, navigation]),
  );

  if (!entityId && !fetching && error)
  {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the PostComment.</Text>
      </View>
    );
  }
  if (!entityId || fetching || !correctEntityLoaded)
  {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID='postCommentDetailScrollView'>
      <Text style={styles.label}>Id:</Text>
      <Text>{postComment.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID='uuid'>{postComment.uuid}</Text>
      {/* Content Field */}
      <Text style={styles.label}>Content:</Text>
      <Text testID='content'>{postComment.content}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID='info'>{String(postComment.info ? postComment.info.id : '')}</Text>
      <Text style={styles.label}>Post:</Text>
      <Text testID='post'>{String(postComment.post ? postComment.post.id : '')}</Text>
      <Text style={styles.label}>Parent:</Text>
      <Text testID='parent'>{String(postComment.parent ? postComment.parent.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text='Edit'
          onPress={() => navigation.navigate('PostCommentEdit', {entityId})}
          accessibilityLabel={'PostComment Edit Button'}
          testID='postCommentEditButton'
        />
        <RoundedButton
          text='Delete'
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'PostComment Delete Button'}
          testID='postCommentDeleteButton'
        />
        {deleteModalVisible && (
          <PostCommentDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={postComment}
            testID='postCommentDeleteModal'
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) =>
{
  return {
    postComment: state.postComments.postComment,
    error: state.postComments.errorOne,
    fetching: state.postComments.fetchingOne,
    deleting: state.postComments.deleting,
    errorDeleting: state.postComments.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getPostComment: (id) => dispatch(PostCommentActions.postCommentRequest(id)),
    getAllPostComments: (options) => dispatch(PostCommentActions.postCommentAllRequest(options)),
    deletePostComment: (id) => dispatch(PostCommentActions.postCommentDeleteRequest(id)),
    resetPostComments: () => dispatch(PostCommentActions.postCommentReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCommentDetailScreen);
