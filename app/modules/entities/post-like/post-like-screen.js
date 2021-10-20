import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import PostLikeActions from './post-like.reducer';
import styles from './post-like-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function PostLikeScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const { postLike, postLikeList, getAllPostLikes, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('PostLike entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchPostLikes();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [postLike, fetchPostLikes]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('PostLikeDetail', { entityId: item.id })}>
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
  const renderEmpty = () => <AlertMessage title="No PostLikes Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () => {
    setSearchTerm('');
    fetchPostLikes();
  };

  const performSearch = (query) => {
    if (query === '') {
      cancelSearch();
      return;
    }
    setSearchTerm(query);
    props.performSearch(query);
  };
  const fetchPostLikes = React.useCallback(() => {
    getAllPostLikes({ page: page - 1, sort, size });
  }, [getAllPostLikes, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchPostLikes();
  };
  return (
    <View style={styles.container} testID="postLikeScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={postLikeList}
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
    postLikeList: state.postLikes.postLikeList,
    postLike: state.postLikes.postLike,
    fetching: state.postLikes.fetchingAll,
    error: state.postLikes.errorAll,
    links: state.postLikes.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(PostLikeActions.postLikeSearchRequest(query)),
    getAllPostLikes: (options) => dispatch(PostLikeActions.postLikeAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostLikeScreen);
