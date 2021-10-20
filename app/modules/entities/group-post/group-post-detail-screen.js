import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import GroupPostActions from './group-post.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import GroupPostDeleteModal from './group-post-delete-modal';
import styles from './group-post-styles';

function GroupPostDetailScreen(props) {
  const { route, getGroupPost, navigation, groupPost, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = groupPost?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('GroupPost');
      } else {
        setDeleteModalVisible(false);
        getGroupPost(routeEntityId);
      }
    }, [routeEntityId, getGroupPost, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the GroupPost.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="groupPostDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{groupPost.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID="uuid">{groupPost.uuid}</Text>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Text testID="name">{groupPost.name}</Text>
      {/* Avatar Field */}
      <Text style={styles.label}>Avatar:</Text>
      <Text testID="avatar">{groupPost.avatar}</Text>
      {/* QuickInfo Field */}
      <Text style={styles.label}>QuickInfo:</Text>
      <Text testID="quickInfo">{groupPost.quickInfo}</Text>
      <Text style={styles.label}>Profile:</Text>
      <Text testID="profile">{String(groupPost.profile ? groupPost.profile.id : '')}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID="info">{String(groupPost.info ? groupPost.info.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('GroupPostEdit', { entityId })}
          accessibilityLabel={'GroupPost Edit Button'}
          testID="groupPostEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'GroupPost Delete Button'}
          testID="groupPostDeleteButton"
        />
        {deleteModalVisible && (
          <GroupPostDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={groupPost}
            testID="groupPostDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    groupPost: state.groupPosts.groupPost,
    error: state.groupPosts.errorOne,
    fetching: state.groupPosts.fetchingOne,
    deleting: state.groupPosts.deleting,
    errorDeleting: state.groupPosts.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGroupPost: (id) => dispatch(GroupPostActions.groupPostRequest(id)),
    getAllGroupPosts: (options) => dispatch(GroupPostActions.groupPostAllRequest(options)),
    deleteGroupPost: (id) => dispatch(GroupPostActions.groupPostDeleteRequest(id)),
    resetGroupPosts: () => dispatch(GroupPostActions.groupPostReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPostDetailScreen);
