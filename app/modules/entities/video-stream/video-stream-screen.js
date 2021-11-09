import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import VideoStreamActions from './video-stream.reducer';
import styles from './video-stream-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function VideoStreamScreen(props)
{
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const {videoStream, videoStreamList, getAllVideoStreams, fetching} = props;

  useFocusEffect(
    React.useCallback(() =>
    {
      console.debug('VideoStream entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchVideoStreams();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [videoStream, fetchVideoStreams]),
  );

  const renderRow = ({item}) =>
  {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('VideoStreamDetail', {entityId: item.id})}>
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
  const renderEmpty = () => <AlertMessage title='No VideoStreams Found' show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () =>
  {
    setSearchTerm('');
    fetchVideoStreams();
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
  const fetchVideoStreams = React.useCallback(() =>
  {
    getAllVideoStreams({page: page - 1, sort, size});
  }, [getAllVideoStreams, page, sort, size]);

  const handleLoadMore = () =>
  {
    if (page < props.links.next || props.links.next === undefined || fetching)
    {
      return;
    }
    setPage(page + 1);
    fetchVideoStreams();
  };
  return (
    <View style={styles.container} testID='videoStreamScreen'>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={videoStreamList}
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
    videoStreamList: state.videoStreams.videoStreamList,
    videoStream: state.videoStreams.videoStream,
    fetching: state.videoStreams.fetchingAll,
    error: state.videoStreams.errorAll,
    links: state.videoStreams.links,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    performSearch: (query) => dispatch(VideoStreamActions.videoStreamSearchRequest(query)),
    getAllVideoStreams: (options) => dispatch(VideoStreamActions.videoStreamAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoStreamScreen);
