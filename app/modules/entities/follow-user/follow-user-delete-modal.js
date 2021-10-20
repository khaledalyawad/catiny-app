import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import FollowUserActions from './follow-user.reducer';

import styles from './follow-user-styles';

function FollowUserDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteFollowUser(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('FollowUser');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete FollowUser {entity.id}?</Text>
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
    followUser: state.followUsers.followUser,
    fetching: state.followUsers.fetchingOne,
    deleting: state.followUsers.deleting,
    errorDeleting: state.followUsers.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFollowUser: (id) => dispatch(FollowUserActions.followUserRequest(id)),
    getAllFollowUsers: (options) => dispatch(FollowUserActions.followUserAllRequest(options)),
    deleteFollowUser: (id) => dispatch(FollowUserActions.followUserDeleteRequest(id)),
    resetFollowUsers: () => dispatch(FollowUserActions.followUserReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowUserDeleteModal);
