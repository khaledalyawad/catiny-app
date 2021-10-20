import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import VideoLiveStreamBufferActions from './video-live-stream-buffer.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import VideoLiveStreamBufferDeleteModal from './video-live-stream-buffer-delete-modal';
import styles from './video-live-stream-buffer-styles';

function VideoLiveStreamBufferDetailScreen(props) {
  const { route, getVideoLiveStreamBuffer, navigation, videoLiveStreamBuffer, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = videoLiveStreamBuffer?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('VideoLiveStreamBuffer');
      } else {
        setDeleteModalVisible(false);
        getVideoLiveStreamBuffer(routeEntityId);
      }
    }, [routeEntityId, getVideoLiveStreamBuffer, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the VideoLiveStreamBuffer.</Text>
      </View>
    );
  }
  if (!entityId || fetching || !correctEntityLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="videoLiveStreamBufferDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{videoLiveStreamBuffer.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID="uuid">{videoLiveStreamBuffer.uuid}</Text>
      {/* BufferData Field */}
      <Text style={styles.label}>BufferData:</Text>
      <Text testID="bufferData">Open {videoLiveStreamBuffer.bufferDataContentType} (not implemented)</Text>
      {/* BufferNumber Field */}
      <Text style={styles.label}>BufferNumber:</Text>
      <Text testID="bufferNumber">{videoLiveStreamBuffer.bufferNumber}</Text>
      {/* Path Field */}
      <Text style={styles.label}>Path:</Text>
      <Text testID="path">{videoLiveStreamBuffer.path}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID="info">{String(videoLiveStreamBuffer.info ? videoLiveStreamBuffer.info.id : '')}</Text>
      <Text style={styles.label}>Video Stream:</Text>
      <Text testID="videoStream">{String(videoLiveStreamBuffer.videoStream ? videoLiveStreamBuffer.videoStream.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('VideoLiveStreamBufferEdit', { entityId })}
          accessibilityLabel={'VideoLiveStreamBuffer Edit Button'}
          testID="videoLiveStreamBufferEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'VideoLiveStreamBuffer Delete Button'}
          testID="videoLiveStreamBufferDeleteButton"
        />
        {deleteModalVisible && (
          <VideoLiveStreamBufferDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={videoLiveStreamBuffer}
            testID="videoLiveStreamBufferDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    videoLiveStreamBuffer: state.videoLiveStreamBuffers.videoLiveStreamBuffer,
    error: state.videoLiveStreamBuffers.errorOne,
    fetching: state.videoLiveStreamBuffers.fetchingOne,
    deleting: state.videoLiveStreamBuffers.deleting,
    errorDeleting: state.videoLiveStreamBuffers.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVideoLiveStreamBuffer: (id) => dispatch(VideoLiveStreamBufferActions.videoLiveStreamBufferRequest(id)),
    getAllVideoLiveStreamBuffers: (options) => dispatch(VideoLiveStreamBufferActions.videoLiveStreamBufferAllRequest(options)),
    deleteVideoLiveStreamBuffer: (id) => dispatch(VideoLiveStreamBufferActions.videoLiveStreamBufferDeleteRequest(id)),
    resetVideoLiveStreamBuffers: () => dispatch(VideoLiveStreamBufferActions.videoLiveStreamBufferReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoLiveStreamBufferDetailScreen);
