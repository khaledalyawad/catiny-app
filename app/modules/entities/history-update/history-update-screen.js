import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import HistoryUpdateActions from './history-update.reducer';
import styles from './history-update-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function HistoryUpdateScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const { historyUpdate, historyUpdateList, getAllHistoryUpdates, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('HistoryUpdate entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchHistoryUpdates();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [historyUpdate, fetchHistoryUpdates]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('HistoryUpdateDetail', { entityId: item.id })}>
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
  const renderEmpty = () => <AlertMessage title="No HistoryUpdates Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () => {
    setSearchTerm('');
    fetchHistoryUpdates();
  };

  const performSearch = (query) => {
    if (query === '') {
      cancelSearch();
      return;
    }
    setSearchTerm(query);
    props.performSearch(query);
  };
  const fetchHistoryUpdates = React.useCallback(() => {
    getAllHistoryUpdates({ page: page - 1, sort, size });
  }, [getAllHistoryUpdates, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchHistoryUpdates();
  };
  return (
    <View style={styles.container} testID="historyUpdateScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={historyUpdateList}
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
    historyUpdateList: state.historyUpdates.historyUpdateList,
    historyUpdate: state.historyUpdates.historyUpdate,
    fetching: state.historyUpdates.fetchingAll,
    error: state.historyUpdates.errorAll,
    links: state.historyUpdates.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(HistoryUpdateActions.historyUpdateSearchRequest(query)),
    getAllHistoryUpdates: (options) => dispatch(HistoryUpdateActions.historyUpdateAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryUpdateScreen);
