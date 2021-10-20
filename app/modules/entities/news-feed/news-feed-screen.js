import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import NewsFeedActions from './news-feed.reducer';
import styles from './news-feed-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function NewsFeedScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const { newsFeed, newsFeedList, getAllNewsFeeds, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('NewsFeed entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchNewsFeeds();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [newsFeed, fetchNewsFeeds]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('NewsFeedDetail', { entityId: item.id })}>
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
  const renderEmpty = () => <AlertMessage title="No NewsFeeds Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () => {
    setSearchTerm('');
    fetchNewsFeeds();
  };

  const performSearch = (query) => {
    if (query === '') {
      cancelSearch();
      return;
    }
    setSearchTerm(query);
    props.performSearch(query);
  };
  const fetchNewsFeeds = React.useCallback(() => {
    getAllNewsFeeds({ page: page - 1, sort, size });
  }, [getAllNewsFeeds, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchNewsFeeds();
  };
  return (
    <View style={styles.container} testID="newsFeedScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={newsFeedList}
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

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    newsFeedList: state.newsFeeds.newsFeedList,
    newsFeed: state.newsFeeds.newsFeed,
    fetching: state.newsFeeds.fetchingAll,
    error: state.newsFeeds.errorAll,
    links: state.newsFeeds.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(NewsFeedActions.newsFeedSearchRequest(query)),
    getAllNewsFeeds: (options) => dispatch(NewsFeedActions.newsFeedAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedScreen);
