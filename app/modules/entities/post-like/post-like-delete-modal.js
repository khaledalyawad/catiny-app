import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import PostLikeActions from './post-like.reducer';

import styles from './post-like-styles';

function PostLikeDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deletePostLike(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('PostLike');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete PostLike {entity.id}?</Text>
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
    postLike: state.postLikes.postLike,
    fetching: state.postLikes.fetchingOne,
    deleting: state.postLikes.deleting,
    errorDeleting: state.postLikes.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPostLike: (id) => dispatch(PostLikeActions.postLikeRequest(id)),
    getAllPostLikes: (options) => dispatch(PostLikeActions.postLikeAllRequest(options)),
    deletePostLike: (id) => dispatch(PostLikeActions.postLikeDeleteRequest(id)),
    resetPostLikes: () => dispatch(PostLikeActions.postLikeReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostLikeDeleteModal);
