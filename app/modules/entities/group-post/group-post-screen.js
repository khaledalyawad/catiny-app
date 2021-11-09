import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import GroupPostActions from './group-post.reducer';
import styles from './group-post-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function GroupPostScreen(props)
{
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const {groupPost, groupPostList, getAllGroupPosts, fetching} = props;

  useFocusEffect(
    React.useCallback(() =>
    {
      console.debug('GroupPost entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchGroupPosts();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [groupPost, fetchGroupPosts]),
  );

  const renderRow = ({item}) =>
  {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('GroupPostDetail', {entityId: item.id})}>
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
  const renderEmpty = () => <AlertMessage title='No GroupPosts Found' show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () =>
  {
    setSearchTerm('');
    fetchGroupPosts();
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
  const fetchGroupPosts = React.useCallback(() =>
  {
    getAllGroupPosts({page: page - 1, sort, size});
  }, [getAllGroupPosts, page, sort, size]);

  const handleLoadMore = () =>
  {
    if (page < props.links.next || props.links.next === undefined || fetching)
    {
      return;
    }
    setPage(page + 1);
    fetchGroupPosts();
  };
  return (
    <View style={styles.container} testID='groupPostScreen'>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={groupPostList}
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
    groupPostList: state.groupPosts.groupPostList,
    groupPost: state.groupPosts.groupPost,
    fetching: state.groupPosts.fetchingAll,
    error: state.groupPosts.errorAll,
    links: state.groupPosts.links,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    performSearch: (query) => dispatch(GroupPostActions.groupPostSearchRequest(query)),
    getAllGroupPosts: (options) => dispatch(GroupPostActions.groupPostAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPostScreen);
