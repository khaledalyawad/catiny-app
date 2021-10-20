import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import PageProfileActions from './page-profile.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import PageProfileDeleteModal from './page-profile-delete-modal';
import styles from './page-profile-styles';

function PageProfileDetailScreen(props) {
  const { route, getPageProfile, navigation, pageProfile, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = pageProfile?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('PageProfile');
      } else {
        setDeleteModalVisible(false);
        getPageProfile(routeEntityId);
      }
    }, [routeEntityId, getPageProfile, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the PageProfile.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="pageProfileDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{pageProfile.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID="uuid">{pageProfile.uuid}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID="info">{String(pageProfile.info ? pageProfile.info.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('PageProfileEdit', { entityId })}
          accessibilityLabel={'PageProfile Edit Button'}
          testID="pageProfileEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'PageProfile Delete Button'}
          testID="pageProfileDeleteButton"
        />
        {deleteModalVisible && (
          <PageProfileDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={pageProfile}
            testID="pageProfileDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    pageProfile: state.pageProfiles.pageProfile,
    error: state.pageProfiles.errorOne,
    fetching: state.pageProfiles.fetchingOne,
    deleting: state.pageProfiles.deleting,
    errorDeleting: state.pageProfiles.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPageProfile: (id) => dispatch(PageProfileActions.pageProfileRequest(id)),
    getAllPageProfiles: (options) => dispatch(PageProfileActions.pageProfileAllRequest(options)),
    deletePageProfile: (id) => dispatch(PageProfileActions.pageProfileDeleteRequest(id)),
    resetPageProfiles: () => dispatch(PageProfileActions.pageProfileReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageProfileDetailScreen);
