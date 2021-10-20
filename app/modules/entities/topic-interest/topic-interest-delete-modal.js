import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import TopicInterestActions from './topic-interest.reducer';

import styles from './topic-interest-styles';

function TopicInterestDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteTopicInterest(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('TopicInterest');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete TopicInterest {entity.id}?</Text>
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
    topicInterest: state.topicInterests.topicInterest,
    fetching: state.topicInterests.fetchingOne,
    deleting: state.topicInterests.deleting,
    errorDeleting: state.topicInterests.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTopicInterest: (id) => dispatch(TopicInterestActions.topicInterestRequest(id)),
    getAllTopicInterests: (options) => dispatch(TopicInterestActions.topicInterestAllRequest(options)),
    deleteTopicInterest: (id) => dispatch(TopicInterestActions.topicInterestDeleteRequest(id)),
    resetTopicInterests: () => dispatch(TopicInterestActions.topicInterestReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicInterestDeleteModal);
