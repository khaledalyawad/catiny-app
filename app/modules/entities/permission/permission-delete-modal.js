import React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';

import PermissionActions from './permission.reducer';

import styles from './permission-styles';

function PermissionDeleteModal(props)
{
  const {visible, setVisible, entity, navigation, testID} = props;

  const deleteEntity = () =>
  {
    props.deletePermission(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Permission');
  };
  return (
    <Modal animationType='slide' transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Permission {entity.id}?</Text>
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
    permission: state.permissions.permission,
    fetching: state.permissions.fetchingOne,
    deleting: state.permissions.deleting,
    errorDeleting: state.permissions.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getPermission: (id) => dispatch(PermissionActions.permissionRequest(id)),
    getAllPermissions: (options) => dispatch(PermissionActions.permissionAllRequest(options)),
    deletePermission: (id) => dispatch(PermissionActions.permissionDeleteRequest(id)),
    resetPermissions: () => dispatch(PermissionActions.permissionReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PermissionDeleteModal);
