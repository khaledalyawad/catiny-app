import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import GroupProfileActions from './group-profile.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import GroupProfileDeleteModal from './group-profile-delete-modal';
import styles from './group-profile-styles';

function GroupProfileDetailScreen(props) {
  const { route, getGroupProfile, navigation, groupProfile, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = groupProfile?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('GroupProfile');
      } else {
        setDeleteModalVisible(false);
        getGroupProfile(routeEntityId);
      }
    }, [routeEntityId, getGroupProfile, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the GroupProfile.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="groupProfileDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{groupProfile.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID="uuid">{groupProfile.uuid}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID="info">{String(groupProfile.info ? groupProfile.info.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('GroupProfileEdit', { entityId })}
          accessibilityLabel={'GroupProfile Edit Button'}
          testID="groupProfileEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'GroupProfile Delete Button'}
          testID="groupProfileDeleteButton"
        />
        {deleteModalVisible && (
          <GroupProfileDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={groupProfile}
            testID="groupProfileDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    groupProfile: state.groupProfiles.groupProfile,
    error: state.groupProfiles.errorOne,
    fetching: state.groupProfiles.fetchingOne,
    deleting: state.groupProfiles.deleting,
    errorDeleting: state.groupProfiles.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGroupProfile: (id) => dispatch(GroupProfileActions.groupProfileRequest(id)),
    getAllGroupProfiles: (options) => dispatch(GroupProfileActions.groupProfileAllRequest(options)),
    deleteGroupProfile: (id) => dispatch(GroupProfileActions.groupProfileDeleteRequest(id)),
    resetGroupProfiles: () => dispatch(GroupProfileActions.groupProfileReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupProfileDetailScreen);
