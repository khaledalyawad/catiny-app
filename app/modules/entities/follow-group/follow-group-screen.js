import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import FollowGroupActions from './follow-group.reducer';
import styles from './follow-group-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function FollowGroupScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const { followGroup, followGroupList, getAllFollowGroups, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('FollowGroup entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchFollowGroups();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [followGroup, fetchFollowGroups]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('FollowGroupDetail', { entityId: item.id })}>
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
  const renderEmpty = () => <AlertMessage title="No FollowGroups Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () => {
    setSearchTerm('');
    fetchFollowGroups();
  };

  const performSearch = (query) => {
    if (query === '') {
      cancelSearch();
      return;
    }
    setSearchTerm(query);
    props.performSearch(query);
  };
  const fetchFollowGroups = React.useCallback(() => {
    getAllFollowGroups({ page: page - 1, sort, size });
  }, [getAllFollowGroups, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchFollowGroups();
  };
  return (
    <View style={styles.container} testID="followGroupScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={followGroupList}
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
    followGroupList: state.followGroups.followGroupList,
    followGroup: state.followGroups.followGroup,
    fetching: state.followGroups.fetchingAll,
    error: state.followGroups.errorAll,
    links: state.followGroups.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(FollowGroupActions.followGroupSearchRequest(query)),
    getAllFollowGroups: (options) => dispatch(FollowGroupActions.followGroupAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowGroupScreen);
