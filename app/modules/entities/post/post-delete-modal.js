import React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';

import PostActions from './post.reducer';

import styles from './post-styles';

function PostDeleteModal(props)
{
  const {visible, setVisible, entity, navigation, testID} = props;

  const deleteEntity = () =>
  {
    props.deletePost(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Post');
  };
  return (
    <Modal animationType='slide' transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Post {entity.id}?</Text>
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
    post: state.posts.post,
    fetching: state.posts.fetchingOne,
    deleting: state.posts.deleting,
    errorDeleting: state.posts.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getPost: (id) => dispatch(PostActions.postRequest(id)),
    getAllPosts: (options) => dispatch(PostActions.postAllRequest(options)),
    deletePost: (id) => dispatch(PostActions.postDeleteRequest(id)),
    resetPosts: () => dispatch(PostActions.postReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDeleteModal);
