import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import VideoStreamActions from './video-stream.reducer';

import styles from './video-stream-styles';

function VideoStreamDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteVideoStream(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('VideoStream');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete VideoStream {entity.id}?</Text>
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
    videoStream: state.videoStreams.videoStream,
    fetching: state.videoStreams.fetchingOne,
    deleting: state.videoStreams.deleting,
    errorDeleting: state.videoStreams.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVideoStream: (id) => dispatch(VideoStreamActions.videoStreamRequest(id)),
    getAllVideoStreams: (options) => dispatch(VideoStreamActions.videoStreamAllRequest(options)),
    deleteVideoStream: (id) => dispatch(VideoStreamActions.videoStreamDeleteRequest(id)),
    resetVideoStreams: () => dispatch(VideoStreamActions.videoStreamReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoStreamDeleteModal);
