import React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';

import DeviceStatusActions from './device-status.reducer';

import styles from './device-status-styles';

function DeviceStatusDeleteModal(props)
{
  const {visible, setVisible, entity, navigation, testID} = props;

  const deleteEntity = () =>
  {
    props.deleteDeviceStatus(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('DeviceStatus');
  };
  return (
    <Modal animationType='slide' transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete DeviceStatus {entity.id}?</Text>
          </View>
          <View style={[styles.flexRow]}>
            <TouchableHighlight
              style={[styles.openButton, styles.cancelButton]}
              onPress={() =>
              {
                setVisible(false);
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.openButton, styles.submitButton]} onPress={deleteEntity} testID='deleteButton'>
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const mapStateToProps = (state) =>
{
  return {
    deviceStatus: state.deviceStatuses.deviceStatus,
    fetching: state.deviceStatuses.fetchingOne,
    deleting: state.deviceStatuses.deleting,
    errorDeleting: state.deviceStatuses.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getDeviceStatus: (id) => dispatch(DeviceStatusActions.deviceStatusRequest(id)),
    getAllDeviceStatuses: (options) => dispatch(DeviceStatusActions.deviceStatusAllRequest(options)),
    deleteDeviceStatus: (id) => dispatch(DeviceStatusActions.deviceStatusDeleteRequest(id)),
    resetDeviceStatuses: () => dispatch(DeviceStatusActions.deviceStatusReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceStatusDeleteModal);
