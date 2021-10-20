import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import AccountStatusActions from './account-status.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import AccountStatusDeleteModal from './account-status-delete-modal';
import styles from './account-status-styles';

function AccountStatusDetailScreen(props) {
  const { route, getAccountStatus, navigation, accountStatus, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = accountStatus?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('AccountStatus');
      } else {
        setDeleteModalVisible(false);
        getAccountStatus(routeEntityId);
      }
    }, [routeEntityId, getAccountStatus, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the AccountStatus.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="accountStatusDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{accountStatus.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID="uuid">{accountStatus.uuid}</Text>
      {/* AccountStatus Field */}
      <Text style={styles.label}>AccountStatus:</Text>
      <Text testID="accountStatus">{accountStatus.accountStatus}</Text>
      {/* LastVisited Field */}
      <Text style={styles.label}>LastVisited:</Text>
      <Text testID="lastVisited">{String(accountStatus.lastVisited)}</Text>
      {/* StatusComment Field */}
      <Text style={styles.label}>StatusComment:</Text>
      <Text testID="statusComment">{accountStatus.statusComment}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID="info">{String(accountStatus.info ? accountStatus.info.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('AccountStatusEdit', { entityId })}
          accessibilityLabel={'AccountStatus Edit Button'}
          testID="accountStatusEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'AccountStatus Delete Button'}
          testID="accountStatusDeleteButton"
        />
        {deleteModalVisible && (
          <AccountStatusDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={accountStatus}
            testID="accountStatusDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    accountStatus: state.accountStatuses.accountStatus,
    error: state.accountStatuses.errorOne,
    fetching: state.accountStatuses.fetchingOne,
    deleting: state.accountStatuses.deleting,
    errorDeleting: state.accountStatuses.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAccountStatus: (id) => dispatch(AccountStatusActions.accountStatusRequest(id)),
    getAllAccountStatuses: (options) => dispatch(AccountStatusActions.accountStatusAllRequest(options)),
    deleteAccountStatus: (id) => dispatch(AccountStatusActions.accountStatusDeleteRequest(id)),
    resetAccountStatuses: () => dispatch(AccountStatusActions.accountStatusReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountStatusDetailScreen);
