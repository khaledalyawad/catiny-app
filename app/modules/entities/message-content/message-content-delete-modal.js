import React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';

import MessageContentActions from './message-content.reducer';

import styles from './message-content-styles';

function MessageContentDeleteModal(props)
{
  const {visible, setVisible, entity, navigation, testID} = props;

  const deleteEntity = () =>
  {
    props.deleteMessageContent(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('MessageContent');
  };
  return (
    <Modal animationType='slide' transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete MessageContent {entity.id}?</Text>
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
    messageContent: state.messageContents.messageContent,
    fetching: state.messageContents.fetchingOne,
    deleting: state.messageContents.deleting,
    errorDeleting: state.messageContents.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getMessageContent: (id) => dispatch(MessageContentActions.messageContentRequest(id)),
    getAllMessageContents: (options) => dispatch(MessageContentActions.messageContentAllRequest(options)),
    deleteMessageContent: (id) => dispatch(MessageContentActions.messageContentDeleteRequest(id)),
    resetMessageContents: () => dispatch(MessageContentActions.messageContentReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageContentDeleteModal);
