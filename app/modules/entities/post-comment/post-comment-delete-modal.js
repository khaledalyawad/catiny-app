import React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';

import PostCommentActions from './post-comment.reducer';

import styles from './post-comment-styles';

function PostCommentDeleteModal(props)
{
  const {visible, setVisible, entity, navigation, testID} = props;

  const deleteEntity = () =>
  {
    props.deletePostComment(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('PostComment');
  };
  return (
    <Modal animationType='slide' transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete PostComment {entity.id}?</Text>
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
    postComment: state.postComments.postComment,
    fetching: state.postComments.fetchingOne,
    deleting: state.postComments.deleting,
    errorDeleting: state.postComments.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getPostComment: (id) => dispatch(PostCommentActions.postCommentRequest(id)),
    getAllPostComments: (options) => dispatch(PostCommentActions.postCommentAllRequest(options)),
    deletePostComment: (id) => dispatch(PostCommentActions.postCommentDeleteRequest(id)),
    resetPostComments: () => dispatch(PostCommentActions.postCommentReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCommentDeleteModal);
