import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import TopicInterestActions from './topic-interest.reducer';
import styles from './topic-interest-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function TopicInterestScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const { topicInterest, topicInterestList, getAllTopicInterests, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('TopicInterest entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchTopicInterests();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [topicInterest, fetchTopicInterests]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('TopicInterestDetail', { entityId: item.id })}>
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
  const renderEmpty = () => <AlertMessage title="No TopicInterests Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () => {
    setSearchTerm('');
    fetchTopicInterests();
  };

  const performSearch = (query) => {
    if (query === '') {
      cancelSearch();
      return;
    }
    setSearchTerm(query);
    props.performSearch(query);
  };
  const fetchTopicInterests = React.useCallback(() => {
    getAllTopicInterests({ page: page - 1, sort, size });
  }, [getAllTopicInterests, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchTopicInterests();
  };
  return (
    <View style={styles.container} testID="topicInterestScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={topicInterestList}
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
    topicInterestList: state.topicInterests.topicInterestList,
    topicInterest: state.topicInterests.topicInterest,
    fetching: state.topicInterests.fetchingAll,
    error: state.topicInterests.errorAll,
    links: state.topicInterests.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(TopicInterestActions.topicInterestSearchRequest(query)),
    getAllTopicInterests: (options) => dispatch(TopicInterestActions.topicInterestAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicInterestScreen);
