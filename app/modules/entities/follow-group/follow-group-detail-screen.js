import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import FollowGroupActions from './follow-group.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import FollowGroupDeleteModal from './follow-group-delete-modal';
import styles from './follow-group-styles';

function FollowGroupDetailScreen(props) {
  const { route, getFollowGroup, navigation, followGroup, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = followGroup?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('FollowGroup');
      } else {
        setDeleteModalVisible(false);
        getFollowGroup(routeEntityId);
      }
    }, [routeEntityId, getFollowGroup, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the FollowGroup.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="followGroupDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{followGroup.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID="uuid">{followGroup.uuid}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID="info">{String(followGroup.info ? followGroup.info.id : '')}</Text>
      <Text style={styles.label}>Group Details:</Text>
      <Text testID="groupDetails">{String(followGroup.groupDetails ? followGroup.groupDetails.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('FollowGroupEdit', { entityId })}
          accessibilityLabel={'FollowGroup Edit Button'}
          testID="followGroupEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'FollowGroup Delete Button'}
          testID="followGroupDeleteButton"
        />
        {deleteModalVisible && (
          <FollowGroupDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={followGroup}
            testID="followGroupDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    followGroup: state.followGroups.followGroup,
    error: state.followGroups.errorOne,
    fetching: state.followGroups.fetchingOne,
    deleting: state.followGroups.deleting,
    errorDeleting: state.followGroups.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFollowGroup: (id) => dispatch(FollowGroupActions.followGroupRequest(id)),
    getAllFollowGroups: (options) => dispatch(FollowGroupActions.followGroupAllRequest(options)),
    deleteFollowGroup: (id) => dispatch(FollowGroupActions.followGroupDeleteRequest(id)),
    resetFollowGroups: () => dispatch(FollowGroupActions.followGroupReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowGroupDetailScreen);
