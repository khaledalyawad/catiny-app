import React from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import FollowUserActions from './follow-user.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import FollowUserDeleteModal from './follow-user-delete-modal';
import styles from './follow-user-styles';

function FollowUserDetailScreen(props)
{
  const {route, getFollowUser, navigation, followUser, fetching, error} = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = followUser?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() =>
    {
      if (!routeEntityId)
      {
        navigation.navigate('FollowUser');
      }
      else
      {
        setDeleteModalVisible(false);
        getFollowUser(routeEntityId);
      }
    }, [routeEntityId, getFollowUser, navigation]),
  );

  if (!entityId && !fetching && error)
  {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the FollowUser.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID='followUserDetailScrollView'>
      <Text style={styles.label}>Id:</Text>
      <Text>{followUser.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID='uuid'>{followUser.uuid}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID='info'>{String(followUser.info ? followUser.info.id : '')}</Text>
      <Text style={styles.label}>Follow:</Text>
      <Text testID='follow'>{String(followUser.follow ? followUser.follow.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text='Edit'
          onPress={() => navigation.navigate('FollowUserEdit', {entityId})}
          accessibilityLabel={'FollowUser Edit Button'}
          testID='followUserEditButton'
        />
        <RoundedButton
          text='Delete'
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'FollowUser Delete Button'}
          testID='followUserDeleteButton'
        />
        {deleteModalVisible && (
          <FollowUserDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={followUser}
            testID='followUserDeleteModal'
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) =>
{
  return {
    followUser: state.followUsers.followUser,
    error: state.followUsers.errorOne,
    fetching: state.followUsers.fetchingOne,
    deleting: state.followUsers.deleting,
    errorDeleting: state.followUsers.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getFollowUser: (id) => dispatch(FollowUserActions.followUserRequest(id)),
    getAllFollowUsers: (options) => dispatch(FollowUserActions.followUserAllRequest(options)),
    deleteFollowUser: (id) => dispatch(FollowUserActions.followUserDeleteRequest(id)),
    resetFollowUsers: () => dispatch(FollowUserActions.followUserReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowUserDetailScreen);
