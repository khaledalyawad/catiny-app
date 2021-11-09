import React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';

import VideoLiveStreamBufferActions from './video-live-stream-buffer.reducer';

import styles from './video-live-stream-buffer-styles';

function VideoLiveStreamBufferDeleteModal(props)
{
  const {visible, setVisible, entity, navigation, testID} = props;

  const deleteEntity = () =>
  {
    props.deleteVideoLiveStreamBuffer(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('VideoLiveStreamBuffer');
  };
  return (
    <Modal animationType='slide' transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete VideoLiveStreamBuffer {entity.id}?</Text>
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
    videoLiveStreamBuffer: state.videoLiveStreamBuffers.videoLiveStreamBuffer,
    fetching: state.videoLiveStreamBuffers.fetchingOne,
    deleting: state.videoLiveStreamBuffers.deleting,
    errorDeleting: state.videoLiveStreamBuffers.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getVideoLiveStreamBuffer: (id) => dispatch(VideoLiveStreamBufferActions.videoLiveStreamBufferRequest(id)),
    getAllVideoLiveStreamBuffers: (options) => dispatch(VideoLiveStreamBufferActions.videoLiveStreamBufferAllRequest(options)),
    deleteVideoLiveStreamBuffer: (id) => dispatch(VideoLiveStreamBufferActions.videoLiveStreamBufferDeleteRequest(id)),
    resetVideoLiveStreamBuffers: () => dispatch(VideoLiveStreamBufferActions.videoLiveStreamBufferReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoLiveStreamBufferDeleteModal);
