import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import PagePostActions from './page-post.reducer';
import styles from './page-post-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function PagePostScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const { pagePost, pagePostList, getAllPagePosts, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('PagePost entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchPagePosts();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [pagePost, fetchPagePosts]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('PagePostDetail', { entityId: item.id })}>
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
  const renderEmpty = () => <AlertMessage title="No PagePosts Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () => {
    setSearchTerm('');
    fetchPagePosts();
  };

  const performSearch = (query) => {
    if (query === '') {
      cancelSearch();
      return;
    }
    setSearchTerm(query);
    props.performSearch(query);
  };
  const fetchPagePosts = React.useCallback(() => {
    getAllPagePosts({ page: page - 1, sort, size });
  }, [getAllPagePosts, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchPagePosts();
  };
  return (
    <View style={styles.container} testID="pagePostScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={pagePostList}
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
    pagePostList: state.pagePosts.pagePostList,
    pagePost: state.pagePosts.pagePost,
    fetching: state.pagePosts.fetchingAll,
    error: state.pagePosts.errorAll,
    links: state.pagePosts.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(PagePostActions.pagePostSearchRequest(query)),
    getAllPagePosts: (options) => dispatch(PagePostActions.pagePostAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PagePostScreen);
