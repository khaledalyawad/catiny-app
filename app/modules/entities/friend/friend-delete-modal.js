import React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';

import FriendActions from './friend.reducer';

import styles from './friend-styles';

function FriendDeleteModal(props)
{
  const {visible, setVisible, entity, navigation, testID} = props;

  const deleteEntity = () =>
  {
    props.deleteFriend(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Friend');
  };
  return (
    <Modal animationType='slide' transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Friend {entity.id}?</Text>
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
    friend: state.friends.friend,
    fetching: state.friends.fetchingOne,
    deleting: state.friends.deleting,
    errorDeleting: state.friends.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getFriend: (id) => dispatch(FriendActions.friendRequest(id)),
    getAllFriends: (options) => dispatch(FriendActions.friendAllRequest(options)),
    deleteFriend: (id) => dispatch(FriendActions.friendDeleteRequest(id)),
    resetFriends: () => dispatch(FriendActions.friendReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendDeleteModal);
