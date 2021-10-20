import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import PostActions from './post.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import PostDeleteModal from './post-delete-modal';
import styles from './post-styles';

function PostDetailScreen(props) {
  const { route, getPost, navigation, post, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = post?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Post');
      } else {
        setDeleteModalVisible(false);
        getPost(routeEntityId);
      }
    }, [routeEntityId, getPost, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Post.</Text>
      </View>
    );
  }
  if (!entityId || fetching || !correctEntityLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="postDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{post.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID="uuid">{post.uuid}</Text>
      {/* PostInType Field */}
      <Text style={styles.label}>PostInType:</Text>
      <Text testID="postInType">{post.postInType}</Text>
      {/* PostType Field */}
      <Text style={styles.label}>PostType:</Text>
      <Text testID="postType">{post.postType}</Text>
      {/* Content Field */}
      <Text style={styles.label}>Content:</Text>
      <Text testID="content">{post.content}</Text>
      {/* SearchField Field */}
      <Text style={styles.label}>SearchField:</Text>
      <Text testID="searchField">{post.searchField}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID="info">{String(post.info ? post.info.id : '')}</Text>
      <Text style={styles.label}>Group:</Text>
      <Text testID="group">{String(post.group ? post.group.id : '')}</Text>
      <Text style={styles.label}>Page:</Text>
      <Text testID="page">{String(post.page ? post.page.id : '')}</Text>
      <Text style={styles.label}>Parent:</Text>
      <Text testID="parent">{String(post.parent ? post.parent.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('PostEdit', { entityId })}
          accessibilityLabel={'Post Edit Button'}
          testID="postEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Post Delete Button'}
          testID="postDeleteButton"
        />
        {deleteModalVisible && (
          <PostDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={post}
            testID="postDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    post: state.posts.post,
    error: state.posts.errorOne,
    fetching: state.posts.fetchingOne,
    deleting: state.posts.deleting,
    errorDeleting: state.posts.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: (id) => dispatch(PostActions.postRequest(id)),
    getAllPosts: (options) => dispatch(PostActions.postAllRequest(options)),
    deletePost: (id) => dispatch(PostActions.postDeleteRequest(id)),
    resetPosts: () => dispatch(PostActions.postReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailScreen);
