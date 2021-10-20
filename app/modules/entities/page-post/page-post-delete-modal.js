import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import PagePostActions from './page-post.reducer';

import styles from './page-post-styles';

function PagePostDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deletePagePost(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('PagePost');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete PagePost {entity.id}?</Text>
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
    pagePost: state.pagePosts.pagePost,
    fetching: state.pagePosts.fetchingOne,
    deleting: state.pagePosts.deleting,
    errorDeleting: state.pagePosts.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPagePost: (id) => dispatch(PagePostActions.pagePostRequest(id)),
    getAllPagePosts: (options) => dispatch(PagePostActions.pagePostAllRequest(options)),
    deletePagePost: (id) => dispatch(PagePostActions.pagePostDeleteRequest(id)),
    resetPagePosts: () => dispatch(PagePostActions.pagePostReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PagePostDeleteModal);
