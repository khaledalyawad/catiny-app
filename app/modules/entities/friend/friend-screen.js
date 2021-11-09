import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import FriendActions from './friend.reducer';
import styles from './friend-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function FriendScreen(props)
{
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const {friend, friendList, getAllFriends, fetching} = props;

  useFocusEffect(
    React.useCallback(() =>
    {
      console.debug('Friend entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchFriends();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [friend, fetchFriends]),
  );

  const renderRow = ({item}) =>
  {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('FriendDetail', {entityId: item.id})}>
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
  const renderEmpty = () => <AlertMessage title='No Friends Found' show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () =>
  {
    setSearchTerm('');
    fetchFriends();
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
  const fetchFriends = React.useCallback(() =>
  {
    getAllFriends({page: page - 1, sort, size});
  }, [getAllFriends, page, sort, size]);

  const handleLoadMore = () =>
  {
    if (page < props.links.next || props.links.next === undefined || fetching)
    {
      return;
    }
    setPage(page + 1);
    fetchFriends();
  };
  return (
    <View style={styles.container} testID='friendScreen'>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={friendList}
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
    friendList: state.friends.friendList,
    friend: state.friends.friend,
    fetching: state.friends.fetchingAll,
    error: state.friends.errorAll,
    links: state.friends.links,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    performSearch: (query) => dispatch(FriendActions.friendSearchRequest(query)),
    getAllFriends: (options) => dispatch(FriendActions.friendAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendScreen);
