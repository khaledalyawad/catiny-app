import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import MasterUserActions from './master-user.reducer';
import styles from './master-user-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function MasterUserScreen(props)
{
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const {masterUser, masterUserList, getAllMasterUsers, fetching} = props;

  useFocusEffect(
    React.useCallback(() =>
    {
      console.debug('MasterUser entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchMasterUsers();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [masterUser, fetchMasterUsers]),
  );

  const renderRow = ({item}) =>
  {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('MasterUserDetail', {entityId: item.id})}>
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
  const renderEmpty = () => <AlertMessage title='No MasterUsers Found' show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () =>
  {
    setSearchTerm('');
    fetchMasterUsers();
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
  const fetchMasterUsers = React.useCallback(() =>
  {
    getAllMasterUsers({page: page - 1, sort, size});
  }, [getAllMasterUsers, page, sort, size]);

  const handleLoadMore = () =>
  {
    if (page < props.links.next || props.links.next === undefined || fetching)
    {
      return;
    }
    setPage(page + 1);
    fetchMasterUsers();
  };
  return (
    <View style={styles.container} testID='masterUserScreen'>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={masterUserList}
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
    masterUserList: state.masterUsers.masterUserList,
    masterUser: state.masterUsers.masterUser,
    fetching: state.masterUsers.fetchingAll,
    error: state.masterUsers.errorAll,
    links: state.masterUsers.links,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    performSearch: (query) => dispatch(MasterUserActions.masterUserSearchRequest(query)),
    getAllMasterUsers: (options) => dispatch(MasterUserActions.masterUserAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MasterUserScreen);
