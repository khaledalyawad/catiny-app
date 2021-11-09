import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import MessageContentActions from './message-content.reducer';
import styles from './message-content-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function MessageContentScreen(props)
{
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const {messageContent, messageContentList, getAllMessageContents, fetching} = props;

  useFocusEffect(
    React.useCallback(() =>
    {
      console.debug('MessageContent entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchMessageContents();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [messageContent, fetchMessageContents]),
  );

  const renderRow = ({item}) =>
  {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('MessageContentDetail', {entityId: item.id})}>
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
  const renderEmpty = () => <AlertMessage title='No MessageContents Found' show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () =>
  {
    setSearchTerm('');
    fetchMessageContents();
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
  const fetchMessageContents = React.useCallback(() =>
  {
    getAllMessageContents({page: page - 1, sort, size});
  }, [getAllMessageContents, page, sort, size]);

  const handleLoadMore = () =>
  {
    if (page < props.links.next || props.links.next === undefined || fetching)
    {
      return;
    }
    setPage(page + 1);
    fetchMessageContents();
  };
  return (
    <View style={styles.container} testID='messageContentScreen'>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={messageContentList}
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
    messageContentList: state.messageContents.messageContentList,
    messageContent: state.messageContents.messageContent,
    fetching: state.messageContents.fetchingAll,
    error: state.messageContents.errorAll,
    links: state.messageContents.links,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    performSearch: (query) => dispatch(MessageContentActions.messageContentSearchRequest(query)),
    getAllMessageContents: (options) => dispatch(MessageContentActions.messageContentAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageContentScreen);
