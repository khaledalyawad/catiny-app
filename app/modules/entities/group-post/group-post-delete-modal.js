import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import GroupPostActions from './group-post.reducer';

import styles from './group-post-styles';

function GroupPostDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteGroupPost(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('GroupPost');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete GroupPost {entity.id}?</Text>
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
    groupPost: state.groupPosts.groupPost,
    fetching: state.groupPosts.fetchingOne,
    deleting: state.groupPosts.deleting,
    errorDeleting: state.groupPosts.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGroupPost: (id) => dispatch(GroupPostActions.groupPostRequest(id)),
    getAllGroupPosts: (options) => dispatch(GroupPostActions.groupPostAllRequest(options)),
    deleteGroupPost: (id) => dispatch(GroupPostActions.groupPostDeleteRequest(id)),
    resetGroupPosts: () => dispatch(GroupPostActions.groupPostReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPostDeleteModal);
