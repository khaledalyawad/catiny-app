import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import PostActions from './post.reducer';
import styles from './post-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function PostScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const { post, postList, getAllPosts, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Post entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchPosts();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [post, fetchPosts]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('PostDetail', { entityId: item.id })}>
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
  const renderEmpty = () => <AlertMessage title="No Posts Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () => {
    setSearchTerm('');
    fetchPosts();
  };

  const performSearch = (query) => {
    if (query === '') {
      cancelSearch();
      return;
    }
    setSearchTerm(query);
    props.performSearch(query);
  };
  const fetchPosts = React.useCallback(() => {
    getAllPosts({ page: page - 1, sort, size });
  }, [getAllPosts, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchPosts();
  };
  return (
    <View style={styles.container} testID="postScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={postList}
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
    postList: state.posts.postList,
    post: state.posts.post,
    fetching: state.posts.fetchingAll,
    error: state.posts.errorAll,
    links: state.posts.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(PostActions.postSearchRequest(query)),
    getAllPosts: (options) => dispatch(PostActions.postAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);
