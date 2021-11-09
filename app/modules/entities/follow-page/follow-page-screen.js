import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import FollowPageActions from './follow-page.reducer';
import styles from './follow-page-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function FollowPageScreen(props)
{
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const {followPage, followPageList, getAllFollowPages, fetching} = props;

  useFocusEffect(
    React.useCallback(() =>
    {
      console.debug('FollowPage entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchFollowPages();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [followPage, fetchFollowPages]),
  );

  const renderRow = ({item}) =>
  {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('FollowPageDetail', {entityId: item.id})}>
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
  const renderEmpty = () => <AlertMessage title='No FollowPages Found' show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () =>
  {
    setSearchTerm('');
    fetchFollowPages();
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
  const fetchFollowPages = React.useCallback(() =>
  {
    getAllFollowPages({page: page - 1, sort, size});
  }, [getAllFollowPages, page, sort, size]);

  const handleLoadMore = () =>
  {
    if (page < props.links.next || props.links.next === undefined || fetching)
    {
      return;
    }
    setPage(page + 1);
    fetchFollowPages();
  };
  return (
    <View style={styles.container} testID='followPageScreen'>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={followPageList}
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
    followPageList: state.followPages.followPageList,
    followPage: state.followPages.followPage,
    fetching: state.followPages.fetchingAll,
    error: state.followPages.errorAll,
    links: state.followPages.links,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    performSearch: (query) => dispatch(FollowPageActions.followPageSearchRequest(query)),
    getAllFollowPages: (options) => dispatch(FollowPageActions.followPageAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowPageScreen);
