import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import UserProfileActions from './user-profile.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import UserProfileDeleteModal from './user-profile-delete-modal';
import styles from './user-profile-styles';

function UserProfileDetailScreen(props) {
  const { route, getUserProfile, navigation, userProfile, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = userProfile?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('UserProfile');
      } else {
        setDeleteModalVisible(false);
        getUserProfile(routeEntityId);
      }
    }, [routeEntityId, getUserProfile, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the UserProfile.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="userProfileDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{userProfile.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID="uuid">{userProfile.uuid}</Text>
      {/* Work Field */}
      <Text style={styles.label}>Work:</Text>
      <Text testID="work">{userProfile.work}</Text>
      {/* Education Field */}
      <Text style={styles.label}>Education:</Text>
      <Text testID="education">{userProfile.education}</Text>
      {/* PlacesLived Field */}
      <Text style={styles.label}>PlacesLived:</Text>
      <Text testID="placesLived">{userProfile.placesLived}</Text>
      {/* ContactInfo Field */}
      <Text style={styles.label}>ContactInfo:</Text>
      <Text testID="contactInfo">{userProfile.contactInfo}</Text>
      {/* WebSocialLinks Field */}
      <Text style={styles.label}>WebSocialLinks:</Text>
      <Text testID="webSocialLinks">{userProfile.webSocialLinks}</Text>
      {/* BasicInfo Field */}
      <Text style={styles.label}>BasicInfo:</Text>
      <Text testID="basicInfo">{userProfile.basicInfo}</Text>
      {/* RelationshipInfo Field */}
      <Text style={styles.label}>RelationshipInfo:</Text>
      <Text testID="relationshipInfo">{userProfile.relationshipInfo}</Text>
      {/* Family Field */}
      <Text style={styles.label}>Family:</Text>
      <Text testID="family">{userProfile.family}</Text>
      {/* DetailAbout Field */}
      <Text style={styles.label}>DetailAbout:</Text>
      <Text testID="detailAbout">{userProfile.detailAbout}</Text>
      {/* LifeEvents Field */}
      <Text style={styles.label}>LifeEvents:</Text>
      <Text testID="lifeEvents">{userProfile.lifeEvents}</Text>
      {/* Hobbies Field */}
      <Text style={styles.label}>Hobbies:</Text>
      <Text testID="hobbies">{userProfile.hobbies}</Text>
      {/* Featured Field */}
      <Text style={styles.label}>Featured:</Text>
      <Text testID="featured">{userProfile.featured}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID="info">{String(userProfile.info ? userProfile.info.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('UserProfileEdit', { entityId })}
          accessibilityLabel={'UserProfile Edit Button'}
          testID="userProfileEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'UserProfile Delete Button'}
          testID="userProfileDeleteButton"
        />
        {deleteModalVisible && (
          <UserProfileDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={userProfile}
            testID="userProfileDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.userProfiles.userProfile,
    error: state.userProfiles.errorOne,
    fetching: state.userProfiles.fetchingOne,
    deleting: state.userProfiles.deleting,
    errorDeleting: state.userProfiles.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProfile: (id) => dispatch(UserProfileActions.userProfileRequest(id)),
    getAllUserProfiles: (options) => dispatch(UserProfileActions.userProfileAllRequest(options)),
    deleteUserProfile: (id) => dispatch(UserProfileActions.userProfileDeleteRequest(id)),
    resetUserProfiles: () => dispatch(UserProfileActions.userProfileReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileDetailScreen);
