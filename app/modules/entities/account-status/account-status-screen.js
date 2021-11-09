import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import AccountStatusActions from './account-status.reducer';
import styles from './account-status-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function AccountStatusScreen(props)
{
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const {accountStatus, accountStatusList, getAllAccountStatuses, fetching} = props;

  useFocusEffect(
    React.useCallback(() =>
    {
      console.debug('AccountStatus entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchAccountStatuses();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [accountStatus, fetchAccountStatuses]),
  );

  const renderRow = ({item}) =>
  {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('AccountStatusDetail', {entityId: item.id})}>
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
  const renderEmpty = () => <AlertMessage title='No AccountStatuses Found' show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () =>
  {
    setSearchTerm('');
    fetchAccountStatuses();
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
  const fetchAccountStatuses = React.useCallback(() =>
  {
    getAllAccountStatuses({page: page - 1, sort, size});
  }, [getAllAccountStatuses, page, sort, size]);

  const handleLoadMore = () =>
  {
    if (page < props.links.next || props.links.next === undefined || fetching)
    {
      return;
    }
    setPage(page + 1);
    fetchAccountStatuses();
  };
  return (
    <View style={styles.container} testID='accountStatusScreen'>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={accountStatusList}
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
    accountStatusList: state.accountStatuses.accountStatusList,
    accountStatus: state.accountStatuses.accountStatus,
    fetching: state.accountStatuses.fetchingAll,
    error: state.accountStatuses.errorAll,
    links: state.accountStatuses.links,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    performSearch: (query) => dispatch(AccountStatusActions.accountStatusSearchRequest(query)),
    getAllAccountStatuses: (options) => dispatch(AccountStatusActions.accountStatusAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountStatusScreen);
