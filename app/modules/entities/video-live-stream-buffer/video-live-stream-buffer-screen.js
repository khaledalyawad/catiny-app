import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import VideoLiveStreamBufferActions from './video-live-stream-buffer.reducer';
import styles from './video-live-stream-buffer-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function VideoLiveStreamBufferScreen(props)
{
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const {videoLiveStreamBuffer, videoLiveStreamBufferList, getAllVideoLiveStreamBuffers, fetching} = props;

  useFocusEffect(
    React.useCallback(() =>
    {
      console.debug('VideoLiveStreamBuffer entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchVideoLiveStreamBuffers();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [videoLiveStreamBuffer, fetchVideoLiveStreamBuffers]),
  );

  const renderRow = ({item}) =>
  {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('VideoLiveStreamBufferDetail', {entityId: item.id})}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header
  const renderHeader = () => <SearchBar onSearch={performSearch} searchTerm={searchTerm} onCancel={cancelSearch} />;

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title='No VideoLiveStreamBuffers Found' show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () =>
  {
    setSearchTerm('');
    fetchVideoLiveStreamBuffers();
  };

  const performSearch = (query) =>
  {
    if (query === '')
    {
      cancelSearch();
      return;
    }
    setSearchTerm(query);
    props.performSearch(query);
  };
  const fetchVideoLiveStreamBuffers = React.useCallback(() =>
  {
    getAllVideoLiveStreamBuffers({page: page - 1, sort, size});
  }, [getAllVideoLiveStreamBuffers, page, sort, size]);

  const handleLoadMore = () =>
  {
    if (page < props.links.next || props.links.next === undefined || fetching)
    {
      return;
    }
    setPage(page + 1);
    fetchVideoLiveStreamBuffers();
  };
  return (
    <View style={styles.container} testID='videoLiveStreamBufferScreen'>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={videoLiveStreamBufferList}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        initialNumToRender={oneScreensWorth}
        onEndReached={handleLoadMore}
        ListEmptyComponent={renderEmpty}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
}

const mapStateToProps = (state) =>
{
  return {
    // ...redux state to props here
    videoLiveStreamBufferList: state.videoLiveStreamBuffers.videoLiveStreamBufferList,
    videoLiveStreamBuffer: state.videoLiveStreamBuffers.videoLiveStreamBuffer,
    fetching: state.videoLiveStreamBuffers.fetchingAll,
    error: state.videoLiveStreamBuffers.errorAll,
    links: state.videoLiveStreamBuffers.links,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    performSearch: (query) => dispatch(VideoLiveStreamBufferActions.videoLiveStreamBufferSearchRequest(query)),
    getAllVideoLiveStreamBuffers: (options) => dispatch(VideoLiveStreamBufferActions.videoLiveStreamBufferAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoLiveStreamBufferScreen);
