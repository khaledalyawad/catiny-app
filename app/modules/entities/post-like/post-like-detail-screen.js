import React from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import PostLikeActions from './post-like.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import PostLikeDeleteModal from './post-like-delete-modal';
import styles from './post-like-styles';

function PostLikeDetailScreen(props)
{
  const {route, getPostLike, navigation, postLike, fetching, error} = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = postLike?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() =>
    {
      if (!routeEntityId)
      {
        navigation.navigate('PostLike');
      }
      else
      {
        setDeleteModalVisible(false);
        getPostLike(routeEntityId);
      }
    }, [routeEntityId, getPostLike, navigation]),
  );

  if (!entityId && !fetching && error)
  {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the PostLike.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID='postLikeDetailScrollView'>
      <Text style={styles.label}>Id:</Text>
      <Text>{postLike.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID='uuid'>{postLike.uuid}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID='info'>{String(postLike.info ? postLike.info.id : '')}</Text>
      <Text style={styles.label}>Post:</Text>
      <Text testID='post'>{String(postLike.post ? postLike.post.id : '')}</Text>
      <Text style={styles.label}>Comment:</Text>
      <Text testID='comment'>{String(postLike.comment ? postLike.comment.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text='Edit'
          onPress={() => navigation.navigate('PostLikeEdit', {entityId})}
          accessibilityLabel={'PostLike Edit Button'}
          testID='postLikeEditButton'
        />
        <RoundedButton
          text='Delete'
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'PostLike Delete Button'}
          testID='postLikeDeleteButton'
        />
        {deleteModalVisible && (
          <PostLikeDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={postLike}
            testID='postLikeDeleteModal'
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) =>
{
  return {
    postLike: state.postLikes.postLike,
    error: state.postLikes.errorOne,
    fetching: state.postLikes.fetchingOne,
    deleting: state.postLikes.deleting,
    errorDeleting: state.postLikes.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getPostLike: (id) => dispatch(PostLikeActions.postLikeRequest(id)),
    getAllPostLikes: (options) => dispatch(PostLikeActions.postLikeAllRequest(options)),
    deletePostLike: (id) => dispatch(PostLikeActions.postLikeDeleteRequest(id)),
    resetPostLikes: () => dispatch(PostLikeActions.postLikeReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostLikeDetailScreen);
