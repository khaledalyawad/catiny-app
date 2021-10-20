import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import PagePostActions from './page-post.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import PagePostDeleteModal from './page-post-delete-modal';
import styles from './page-post-styles';

function PagePostDetailScreen(props) {
  const { route, getPagePost, navigation, pagePost, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = pagePost?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('PagePost');
      } else {
        setDeleteModalVisible(false);
        getPagePost(routeEntityId);
      }
    }, [routeEntityId, getPagePost, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the PagePost.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="pagePostDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{pagePost.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID="uuid">{pagePost.uuid}</Text>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Text testID="name">{pagePost.name}</Text>
      {/* Avatar Field */}
      <Text style={styles.label}>Avatar:</Text>
      <Text testID="avatar">{pagePost.avatar}</Text>
      {/* QuickInfo Field */}
      <Text style={styles.label}>QuickInfo:</Text>
      <Text testID="quickInfo">{pagePost.quickInfo}</Text>
      <Text style={styles.label}>Profile:</Text>
      <Text testID="profile">{String(pagePost.profile ? pagePost.profile.id : '')}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID="info">{String(pagePost.info ? pagePost.info.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('PagePostEdit', { entityId })}
          accessibilityLabel={'PagePost Edit Button'}
          testID="pagePostEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'PagePost Delete Button'}
          testID="pagePostDeleteButton"
        />
        {deleteModalVisible && (
          <PagePostDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={pagePost}
            testID="pagePostDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    pagePost: state.pagePosts.pagePost,
    error: state.pagePosts.errorOne,
    fetching: state.pagePosts.fetchingOne,
    deleting: state.pagePosts.deleting,
    errorDeleting: state.pagePosts.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPagePost: (id) => dispatch(PagePostActions.pagePostRequest(id)),
    getAllPagePosts: (options) => dispatch(PagePostActions.pagePostAllRequest(options)),
    deletePagePost: (id) => dispatch(PagePostActions.pagePostDeleteRequest(id)),
    resetPagePosts: () => dispatch(PagePostActions.pagePostReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PagePostDetailScreen);
