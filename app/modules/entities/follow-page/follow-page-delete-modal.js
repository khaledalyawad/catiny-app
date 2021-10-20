import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import FollowPageActions from './follow-page.reducer';

import styles from './follow-page-styles';

function FollowPageDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteFollowPage(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('FollowPage');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete FollowPage {entity.id}?</Text>
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
    followPage: state.followPages.followPage,
    fetching: state.followPages.fetchingOne,
    deleting: state.followPages.deleting,
    errorDeleting: state.followPages.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFollowPage: (id) => dispatch(FollowPageActions.followPageRequest(id)),
    getAllFollowPages: (options) => dispatch(FollowPageActions.followPageAllRequest(options)),
    deleteFollowPage: (id) => dispatch(FollowPageActions.followPageDeleteRequest(id)),
    resetFollowPages: () => dispatch(FollowPageActions.followPageReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowPageDeleteModal);
