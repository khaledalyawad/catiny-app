import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import RankGroupActions from './rank-group.reducer';
import styles from './rank-group-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function RankGroupScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const { rankGroup, rankGroupList, getAllRankGroups, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('RankGroup entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchRankGroups();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [rankGroup, fetchRankGroups]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('RankGroupDetail', { entityId: item.id })}>
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
  const renderEmpty = () => <AlertMessage title="No RankGroups Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () => {
    setSearchTerm('');
    fetchRankGroups();
  };

  const performSearch = (query) => {
    if (query === '') {
      cancelSearch();
      return;
    }
    setSearchTerm(query);
    props.performSearch(query);
  };
  const fetchRankGroups = React.useCallback(() => {
    getAllRankGroups({ page: page - 1, sort, size });
  }, [getAllRankGroups, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchRankGroups();
  };
  return (
    <View style={styles.container} testID="rankGroupScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={rankGroupList}
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
    rankGroupList: state.rankGroups.rankGroupList,
    rankGroup: state.rankGroups.rankGroup,
    fetching: state.rankGroups.fetchingAll,
    error: state.rankGroups.errorAll,
    links: state.rankGroups.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(RankGroupActions.rankGroupSearchRequest(query)),
    getAllRankGroups: (options) => dispatch(RankGroupActions.rankGroupAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RankGroupScreen);
