import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import RankUserActions from './rank-user.reducer';
import styles from './rank-user-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function RankUserScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const { rankUser, rankUserList, getAllRankUsers, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('RankUser entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchRankUsers();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [rankUser, fetchRankUsers]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('RankUserDetail', { entityId: item.id })}>
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
  const renderEmpty = () => <AlertMessage title="No RankUsers Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () => {
    setSearchTerm('');
    fetchRankUsers();
  };

  const performSearch = (query) => {
    if (query === '') {
      cancelSearch();
      return;
    }
    setSearchTerm(query);
    props.performSearch(query);
  };
  const fetchRankUsers = React.useCallback(() => {
    getAllRankUsers({ page: page - 1, sort, size });
  }, [getAllRankUsers, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchRankUsers();
  };
  return (
    <View style={styles.container} testID="rankUserScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={rankUserList}
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
    rankUserList: state.rankUsers.rankUserList,
    rankUser: state.rankUsers.rankUser,
    fetching: state.rankUsers.fetchingAll,
    error: state.rankUsers.errorAll,
    links: state.rankUsers.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(RankUserActions.rankUserSearchRequest(query)),
    getAllRankUsers: (options) => dispatch(RankUserActions.rankUserAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RankUserScreen);
