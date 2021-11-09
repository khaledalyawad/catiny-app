import React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';

import VideoActions from './video.reducer';

import styles from './video-styles';

function VideoDeleteModal(props)
{
  const {visible, setVisible, entity, navigation, testID} = props;

  const deleteEntity = () =>
  {
    props.deleteVideo(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Video');
  };
  return (
    <Modal animationType='slide' transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Video {entity.id}?</Text>
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
    video: state.videos.video,
    fetching: state.videos.fetchingOne,
    deleting: state.videos.deleting,
    errorDeleting: state.videos.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getVideo: (id) => dispatch(VideoActions.videoRequest(id)),
    getAllVideos: (options) => dispatch(VideoActions.videoAllRequest(options)),
    deleteVideo: (id) => dispatch(VideoActions.videoDeleteRequest(id)),
    resetVideos: () => dispatch(VideoActions.videoReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoDeleteModal);
