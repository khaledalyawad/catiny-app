import React from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import VideoActions from './video.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import VideoDeleteModal from './video-delete-modal';
import styles from './video-styles';

function VideoDetailScreen(props)
{
  const {route, getVideo, navigation, video, fetching, error} = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = video?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() =>
    {
      if (!routeEntityId)
      {
        navigation.navigate('Video');
      }
      else
      {
        setDeleteModalVisible(false);
        getVideo(routeEntityId);
      }
    }, [routeEntityId, getVideo, navigation]),
  );

  if (!entityId && !fetching && error)
  {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Video.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID='videoDetailScrollView'>
      <Text style={styles.label}>Id:</Text>
      <Text>{video.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID='uuid'>{video.uuid}</Text>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Text testID='name'>{video.name}</Text>
      {/* Width Field */}
      <Text style={styles.label}>Width:</Text>
      <Text testID='width'>{video.width}</Text>
      {/* Height Field */}
      <Text style={styles.label}>Height:</Text>
      <Text testID='height'>{video.height}</Text>
      {/* QualityImage Field */}
      <Text style={styles.label}>QualityImage:</Text>
      <Text testID='qualityImage'>{video.qualityImage}</Text>
      {/* QualityAudio Field */}
      <Text style={styles.label}>QualityAudio:</Text>
      <Text testID='qualityAudio'>{video.qualityAudio}</Text>
      {/* Quality Field */}
      <Text style={styles.label}>Quality:</Text>
      <Text testID='quality'>{video.quality}</Text>
      {/* PixelSize Field */}
      <Text style={styles.label}>PixelSize:</Text>
      <Text testID='pixelSize'>{video.pixelSize}</Text>
      {/* PriorityIndex Field */}
      <Text style={styles.label}>PriorityIndex:</Text>
      <Text testID='priorityIndex'>{video.priorityIndex}</Text>
      {/* DataSize Field */}
      <Text style={styles.label}>DataSize:</Text>
      <Text testID='dataSize'>{video.dataSize}</Text>
      <Text style={styles.label}>File Info:</Text>
      <Text testID='fileInfo'>{String(video.fileInfo ? video.fileInfo.id : '')}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID='info'>{String(video.info ? video.info.id : '')}</Text>
      <Text style={styles.label}>Original:</Text>
      <Text testID='original'>{String(video.original ? video.original.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text='Edit'
          onPress={() => navigation.navigate('VideoEdit', {entityId})}
          accessibilityLabel={'Video Edit Button'}
          testID='videoEditButton'
        />
        <RoundedButton
          text='Delete'
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Video Delete Button'}
          testID='videoDeleteButton'
        />
        {deleteModalVisible && (
          <VideoDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={video}
            testID='videoDeleteModal'
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) =>
{
  return {
    video: state.videos.video,
    error: state.videos.errorOne,
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

export default connect(mapStateToProps, mapDispatchToProps)(VideoDetailScreen);
