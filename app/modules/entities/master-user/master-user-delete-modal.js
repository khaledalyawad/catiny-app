import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import MasterUserActions from './master-user.reducer';

import styles from './master-user-styles';

function MasterUserDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteMasterUser(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('MasterUser');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete MasterUser {entity.id}?</Text>
          </View>
          <View style={[styles.flexRow]}>
            <TouchableHighlight
              style={[styles.openButton, styles.cancelButton]}
              onPress={() => {
                setVisible(false);
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.openButton, styles.submitButton]} onPress={deleteEntity} testID="deleteButton">
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    masterUser: state.masterUsers.masterUser,
    fetching: state.masterUsers.fetchingOne,
    deleting: state.masterUsers.deleting,
    errorDeleting: state.masterUsers.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMasterUser: (id) => dispatch(MasterUserActions.masterUserRequest(id)),
    getAllMasterUsers: (options) => dispatch(MasterUserActions.masterUserAllRequest(options)),
    deleteMasterUser: (id) => dispatch(MasterUserActions.masterUserDeleteRequest(id)),
    resetMasterUsers: () => dispatch(MasterUserActions.masterUserReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MasterUserDeleteModal);
