import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import PermissionActions from './permission.reducer';
import styles from './permission-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function PermissionScreen(props)
{
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const {permission, permissionList, getAllPermissions, fetching} = props;

  useFocusEffect(
    React.useCallback(() =>
    {
      console.debug('Permission entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchPermissions();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [permission, fetchPermissions]),
  );

  const renderRow = ({item}) =>
  {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('PermissionDetail', {entityId: item.id})}>
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
  const renderEmpty = () => <AlertMessage title='No Permissions Found' show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () =>
  {
    setSearchTerm('');
    fetchPermissions();
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
  const fetchPermissions = React.useCallback(() =>
  {
    getAllPermissions({page: page - 1, sort, size});
  }, [getAllPermissions, page, sort, size]);

  const handleLoadMore = () =>
  {
    if (page < props.links.next || props.links.next === undefined || fetching)
    {
      return;
    }
    setPage(page + 1);
    fetchPermissions();
  };
  return (
    <View style={styles.container} testID='permissionScreen'>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={permissionList}
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
    permissionList: state.permissions.permissionList,
    permission: state.permissions.permission,
    fetching: state.permissions.fetchingAll,
    error: state.permissions.errorAll,
    links: state.permissions.links,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    performSearch: (query) => dispatch(PermissionActions.permissionSearchRequest(query)),
    getAllPermissions: (options) => dispatch(PermissionActions.permissionAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PermissionScreen);
