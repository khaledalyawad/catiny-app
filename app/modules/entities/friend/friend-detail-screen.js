import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import FriendActions from './friend.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import FriendDeleteModal from './friend-delete-modal';
import styles from './friend-styles';

function FriendDetailScreen(props) {
  const { route, getFriend, navigation, friend, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = friend?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Friend');
      } else {
        setDeleteModalVisible(false);
        getFriend(routeEntityId);
      }
    }, [routeEntityId, getFriend, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Friend.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="friendDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{friend.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID="uuid">{friend.uuid}</Text>
      {/* FriendType Field */}
      <Text style={styles.label}>FriendType:</Text>
      <Text testID="friendType">{friend.friendType}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID="info">{String(friend.info ? friend.info.id : '')}</Text>
      <Text style={styles.label}>Friend:</Text>
      <Text testID="friend">{String(friend.friend ? friend.friend.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('FriendEdit', { entityId })}
          accessibilityLabel={'Friend Edit Button'}
          testID="friendEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Friend Delete Button'}
          testID="friendDeleteButton"
        />
        {deleteModalVisible && (
          <FriendDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={friend}
            testID="friendDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    friend: state.friends.friend,
    error: state.friends.errorOne,
    fetching: state.friends.fetchingOne,
    deleting: state.friends.deleting,
    errorDeleting: state.friends.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFriend: (id) => dispatch(FriendActions.friendRequest(id)),
    getAllFriends: (options) => dispatch(FriendActions.friendAllRequest(options)),
    deleteFriend: (id) => dispatch(FriendActions.friendDeleteRequest(id)),
    resetFriends: () => dispatch(FriendActions.friendReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendDetailScreen);
