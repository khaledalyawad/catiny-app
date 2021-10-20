import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import DeviceStatusActions from './device-status.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import DeviceStatusDeleteModal from './device-status-delete-modal';
import styles from './device-status-styles';

function DeviceStatusDetailScreen(props) {
  const { route, getDeviceStatus, navigation, deviceStatus, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = deviceStatus?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('DeviceStatus');
      } else {
        setDeleteModalVisible(false);
        getDeviceStatus(routeEntityId);
      }
    }, [routeEntityId, getDeviceStatus, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the DeviceStatus.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="deviceStatusDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{deviceStatus.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID="uuid">{deviceStatus.uuid}</Text>
      {/* DeviceName Field */}
      <Text style={styles.label}>DeviceName:</Text>
      <Text testID="deviceName">{deviceStatus.deviceName}</Text>
      {/* DeviceType Field */}
      <Text style={styles.label}>DeviceType:</Text>
      <Text testID="deviceType">{deviceStatus.deviceType}</Text>
      {/* DeviceStatus Field */}
      <Text style={styles.label}>DeviceStatus:</Text>
      <Text testID="deviceStatus">{deviceStatus.deviceStatus}</Text>
      {/* LastVisited Field */}
      <Text style={styles.label}>LastVisited:</Text>
      <Text testID="lastVisited">{String(deviceStatus.lastVisited)}</Text>
      {/* StatusComment Field */}
      <Text style={styles.label}>StatusComment:</Text>
      <Text testID="statusComment">{deviceStatus.statusComment}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID="info">{String(deviceStatus.info ? deviceStatus.info.id : '')}</Text>
      <Text style={styles.label}>Account Status:</Text>
      <Text testID="accountStatus">{String(deviceStatus.accountStatus ? deviceStatus.accountStatus.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('DeviceStatusEdit', { entityId })}
          accessibilityLabel={'DeviceStatus Edit Button'}
          testID="deviceStatusEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'DeviceStatus Delete Button'}
          testID="deviceStatusDeleteButton"
        />
        {deleteModalVisible && (
          <DeviceStatusDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={deviceStatus}
            testID="deviceStatusDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    deviceStatus: state.deviceStatuses.deviceStatus,
    error: state.deviceStatuses.errorOne,
    fetching: state.deviceStatuses.fetchingOne,
    deleting: state.deviceStatuses.deleting,
    errorDeleting: state.deviceStatuses.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDeviceStatus: (id) => dispatch(DeviceStatusActions.deviceStatusRequest(id)),
    getAllDeviceStatuses: (options) => dispatch(DeviceStatusActions.deviceStatusAllRequest(options)),
    deleteDeviceStatus: (id) => dispatch(DeviceStatusActions.deviceStatusDeleteRequest(id)),
    resetDeviceStatuses: () => dispatch(DeviceStatusActions.deviceStatusReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceStatusDetailScreen);
