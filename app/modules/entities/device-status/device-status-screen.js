import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import DeviceStatusActions from './device-status.reducer';
import styles from './device-status-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function DeviceStatusScreen(props)
{
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const {deviceStatus, deviceStatusList, getAllDeviceStatuses, fetching} = props;

  useFocusEffect(
    React.useCallback(() =>
    {
      console.debug('DeviceStatus entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchDeviceStatuses();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [deviceStatus, fetchDeviceStatuses]),
  );

  const renderRow = ({item}) =>
  {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('DeviceStatusDetail', {entityId: item.id})}>
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
  const renderEmpty = () => <AlertMessage title='No DeviceStatuses Found' show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () =>
  {
    setSearchTerm('');
    fetchDeviceStatuses();
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
  const fetchDeviceStatuses = React.useCallback(() =>
  {
    getAllDeviceStatuses({page: page - 1, sort, size});
  }, [getAllDeviceStatuses, page, sort, size]);

  const handleLoadMore = () =>
  {
    if (page < props.links.next || props.links.next === undefined || fetching)
    {
      return;
    }
    setPage(page + 1);
    fetchDeviceStatuses();
  };
  return (
    <View style={styles.container} testID='deviceStatusScreen'>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={deviceStatusList}
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
    deviceStatusList: state.deviceStatuses.deviceStatusList,
    deviceStatus: state.deviceStatuses.deviceStatus,
    fetching: state.deviceStatuses.fetchingAll,
    error: state.deviceStatuses.errorAll,
    links: state.deviceStatuses.links,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    performSearch: (query) => dispatch(DeviceStatusActions.deviceStatusSearchRequest(query)),
    getAllDeviceStatuses: (options) => dispatch(DeviceStatusActions.deviceStatusAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceStatusScreen);
