import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import HanhChinhVNActions from './hanh-chinh-vn.reducer';
import styles from './hanh-chinh-vn-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function HanhChinhVNScreen(props)
{
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const {hanhChinhVN, hanhChinhVNList, getAllHanhChinhVNS, fetching} = props;

  useFocusEffect(
    React.useCallback(() =>
    {
      console.debug('HanhChinhVN entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchHanhChinhVNS();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [hanhChinhVN, fetchHanhChinhVNS]),
  );

  const renderRow = ({item}) =>
  {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('HanhChinhVNDetail', {entityId: item.id})}>
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
  const renderEmpty = () => <AlertMessage title='No HanhChinhVNS Found' show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () =>
  {
    setSearchTerm('');
    fetchHanhChinhVNS();
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
  const fetchHanhChinhVNS = React.useCallback(() =>
  {
    getAllHanhChinhVNS({page: page - 1, sort, size});
  }, [getAllHanhChinhVNS, page, sort, size]);

  const handleLoadMore = () =>
  {
    if (page < props.links.next || props.links.next === undefined || fetching)
    {
      return;
    }
    setPage(page + 1);
    fetchHanhChinhVNS();
  };
  return (
    <View style={styles.container} testID='hanhChinhVNScreen'>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={hanhChinhVNList}
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
    hanhChinhVNList: state.hanhChinhVNS.hanhChinhVNList,
    hanhChinhVN: state.hanhChinhVNS.hanhChinhVN,
    fetching: state.hanhChinhVNS.fetchingAll,
    error: state.hanhChinhVNS.errorAll,
    links: state.hanhChinhVNS.links,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    performSearch: (query) => dispatch(HanhChinhVNActions.hanhChinhVNSearchRequest(query)),
    getAllHanhChinhVNS: (options) => dispatch(HanhChinhVNActions.hanhChinhVNAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HanhChinhVNScreen);
