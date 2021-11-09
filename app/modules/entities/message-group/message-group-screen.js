import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import MessageGroupActions from './message-group.reducer';
import styles from './message-group-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function MessageGroupScreen(props)
{
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const {messageGroup, messageGroupList, getAllMessageGroups, fetching} = props;

  useFocusEffect(
    React.useCallback(() =>
    {
      console.debug('MessageGroup entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchMessageGroups();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [messageGroup, fetchMessageGroups]),
  );

  const renderRow = ({item}) =>
  {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('MessageGroupDetail', {entityId: item.id})}>
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
  const renderEmpty = () => <AlertMessage title='No MessageGroups Found' show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () =>
  {
    setSearchTerm('');
    fetchMessageGroups();
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
  const fetchMessageGroups = React.useCallback(() =>
  {
    getAllMessageGroups({page: page - 1, sort, size});
  }, [getAllMessageGroups, page, sort, size]);

  const handleLoadMore = () =>
  {
    if (page < props.links.next || props.links.next === undefined || fetching)
    {
      return;
    }
    setPage(page + 1);
    fetchMessageGroups();
  };
  return (
    <View style={styles.container} testID='messageGroupScreen'>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={messageGroupList}
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
    messageGroupList: state.messageGroups.messageGroupList,
    messageGroup: state.messageGroups.messageGroup,
    fetching: state.messageGroups.fetchingAll,
    error: state.messageGroups.errorAll,
    links: state.messageGroups.links,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    performSearch: (query) => dispatch(MessageGroupActions.messageGroupSearchRequest(query)),
    getAllMessageGroups: (options) => dispatch(MessageGroupActions.messageGroupAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageGroupScreen);
