import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import GroupProfileActions from './group-profile.reducer';

import styles from './group-profile-styles';

function GroupProfileDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteGroupProfile(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('GroupProfile');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete GroupProfile {entity.id}?</Text>
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
    groupProfile: state.groupProfiles.groupProfile,
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupProfileDeleteModal);
