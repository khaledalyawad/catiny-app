import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import TodoListActions from './todo-list.reducer';
import styles from './todo-list-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function TodoListScreen(props)
{
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const {todoList, todoListList, getAllTodoLists, fetching} = props;

  useFocusEffect(
    React.useCallback(() =>
    {
      console.debug('TodoList entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchTodoLists();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [todoList, fetchTodoLists]),
  );

  const renderRow = ({item}) =>
  {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('TodoListDetail', {entityId: item.id})}>
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
  const renderEmpty = () => <AlertMessage title='No TodoLists Found' show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () =>
  {
    setSearchTerm('');
    fetchTodoLists();
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
  const fetchTodoLists = React.useCallback(() =>
  {
    getAllTodoLists({page: page - 1, sort, size});
  }, [getAllTodoLists, page, sort, size]);

  const handleLoadMore = () =>
  {
    if (page < props.links.next || props.links.next === undefined || fetching)
    {
      return;
    }
    setPage(page + 1);
    fetchTodoLists();
  };
  return (
    <View style={styles.container} testID='todoListScreen'>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={todoListList}
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
    todoListList: state.todoLists.todoListList,
    todoList: state.todoLists.todoList,
    fetching: state.todoLists.fetchingAll,
    error: state.todoLists.errorAll,
    links: state.todoLists.links,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    performSearch: (query) => dispatch(TodoListActions.todoListSearchRequest(query)),
    getAllTodoLists: (options) => dispatch(TodoListActions.todoListAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListScreen);
