import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import PostCommentActions from './post-comment.reducer';
import styles from './post-comment-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function PostCommentScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const { postComment, postCommentList, getAllPostComments, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('PostComment entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchPostComments();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [postComment, fetchPostComments]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('PostCommentDetail', { entityId: item.id })}>
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
  const renderEmpty = () => <AlertMessage title="No PostComments Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () => {
    setSearchTerm('');
    fetchPostComments();
  };

  const performSearch = (query) => {
    if (query === '') {
      cancelSearch();
      return;
    }
    setSearchTerm(query);
    props.performSearch(query);
  };
  const fetchPostComments = React.useCallback(() => {
    getAllPostComments({ page: page - 1, sort, size });
  }, [getAllPostComments, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchPostComments();
  };
  return (
    <View style={styles.container} testID="postCommentScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={postCommentList}
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
    postCommentList: state.postComments.postCommentList,
    postComment: state.postComments.postComment,
    fetching: state.postComments.fetchingAll,
    error: state.postComments.errorAll,
    links: state.postComments.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(PostCommentActions.postCommentSearchRequest(query)),
    getAllPostComments: (options) => dispatch(PostCommentActions.postCommentAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCommentScreen);
