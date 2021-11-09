import React from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import VideoStreamActions from './video-stream.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import VideoStreamDeleteModal from './video-stream-delete-modal';
import styles from './video-stream-styles';

function VideoStreamDetailScreen(props)
{
  const {route, getVideoStream, navigation, videoStream, fetching, error} = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = videoStream?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() =>
    {
      if (!routeEntityId)
      {
        navigation.navigate('VideoStream');
      }
      else
      {
        setDeleteModalVisible(false);
        getVideoStream(routeEntityId);
      }
    }, [routeEntityId, getVideoStream, navigation]),
  );

  if (!entityId && !fetching && error)
  {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the VideoStream.</Text>
      </View>
    );
  }
  if (!entityId || fetching || !correctEntityLoaded)
  {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID='videoStreamDetailScrollView'>
      <Text style={styles.label}>Id:</Text>
      <Text>{videoStream.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID='uuid'>{videoStream.uuid}</Text>
      {/* IsLivestreaming Field */}
      <Text style={styles.label}>IsLivestreaming:</Text>
      <Text testID='isLivestreaming'>{String(videoStream.isLivestreaming)}</Text>
      <Text style={styles.label}>Video:</Text>
      <Text testID='video'>{String(videoStream.video ? videoStream.video.id : '')}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID='info'>{String(videoStream.info ? videoStream.info.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text='Edit'
          onPress={() => navigation.navigate('VideoStreamEdit', {entityId})}
          accessibilityLabel={'VideoStream Edit Button'}
          testID='videoStreamEditButton'
        />
        <RoundedButton
          text='Delete'
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'VideoStream Delete Button'}
          testID='videoStreamDeleteButton'
        />
        {deleteModalVisible && (
          <VideoStreamDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={videoStream}
            testID='videoStreamDeleteModal'
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) =>
{
  return {
    videoStream: state.videoStreams.videoStream,
    error: state.videoStreams.errorOne,
    fetching: state.videoStreams.fetchingOne,
    deleting: state.videoStreams.deleting,
    errorDeleting: state.videoStreams.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getVideoStream: (id) => dispatch(VideoStreamActions.videoStreamRequest(id)),
    getAllVideoStreams: (options) => dispatch(VideoStreamActions.videoStreamAllRequest(options)),
    deleteVideoStream: (id) => dispatch(VideoStreamActions.videoStreamDeleteRequest(id)),
    resetVideoStreams: () => dispatch(VideoStreamActions.videoStreamReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoStreamDetailScreen);
