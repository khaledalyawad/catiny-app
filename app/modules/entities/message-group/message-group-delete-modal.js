import React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';

import MessageGroupActions from './message-group.reducer';

import styles from './message-group-styles';

function MessageGroupDeleteModal(props)
{
  const {visible, setVisible, entity, navigation, testID} = props;

  const deleteEntity = () =>
  {
    props.deleteMessageGroup(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('MessageGroup');
  };
  return (
    <Modal animationType='slide' transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete MessageGroup {entity.id}?</Text>
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
    messageGroup: state.messageGroups.messageGroup,
    fetching: state.messageGroups.fetchingOne,
    deleting: state.messageGroups.deleting,
    errorDeleting: state.messageGroups.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getMessageGroup: (id) => dispatch(MessageGroupActions.messageGroupRequest(id)),
    getAllMessageGroups: (options) => dispatch(MessageGroupActions.messageGroupAllRequest(options)),
    deleteMessageGroup: (id) => dispatch(MessageGroupActions.messageGroupDeleteRequest(id)),
    resetMessageGroups: () => dispatch(MessageGroupActions.messageGroupReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageGroupDeleteModal);
