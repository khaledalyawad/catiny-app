import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import VideoActions from './video.reducer';
import styles from './video-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function VideoScreen(props)
{
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const {video, videoList, getAllVideos, fetching} = props;

  useFocusEffect(
    React.useCallback(() =>
    {
      console.debug('Video entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchVideos();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [video, fetchVideos]),
  );

  const renderRow = ({item}) =>
  {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('VideoDetail', {entityId: item.id})}>
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
  const renderEmpty = () => <AlertMessage title='No Videos Found' show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () =>
  {
    setSearchTerm('');
    fetchVideos();
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
  const fetchVideos = React.useCallback(() =>
  {
    getAllVideos({page: page - 1, sort, size});
  }, [getAllVideos, page, sort, size]);

  const handleLoadMore = () =>
  {
    if (page < props.links.next || props.links.next === undefined || fetching)
    {
      return;
    }
    setPage(page + 1);
    fetchVideos();
  };
  return (
    <View style={styles.container} testID='videoScreen'>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={videoList}
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
    videoList: state.videos.videoList,
    video: state.videos.video,
    fetching: state.videos.fetchingAll,
    error: state.videos.errorAll,
    links: state.videos.links,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    performSearch: (query) => dispatch(VideoActions.videoSearchRequest(query)),
    getAllVideos: (options) => dispatch(VideoActions.videoAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoScreen);
