import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import BaseInfoActions from './base-info.reducer';
import styles from './base-info-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function BaseInfoScreen(props)
{
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const {baseInfo, baseInfoList, getAllBaseInfos, fetching} = props;

  useFocusEffect(
    React.useCallback(() =>
    {
      console.debug('BaseInfo entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchBaseInfos();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [baseInfo, fetchBaseInfos]),
  );

  const renderRow = ({item}) =>
  {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('BaseInfoDetail', {entityId: item.id})}>
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
  const renderEmpty = () => <AlertMessage title='No BaseInfos Found' show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () =>
  {
    setSearchTerm('');
    fetchBaseInfos();
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
  const fetchBaseInfos = React.useCallback(() =>
  {
    getAllBaseInfos({page: page - 1, sort, size});
  }, [getAllBaseInfos, page, sort, size]);

  const handleLoadMore = () =>
  {
    if (page < props.links.next || props.links.next === undefined || fetching)
    {
      return;
    }
    setPage(page + 1);
    fetchBaseInfos();
  };
  return (
    <View style={styles.container} testID='baseInfoScreen'>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={baseInfoList}
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
    baseInfoList: state.baseInfos.baseInfoList,
    baseInfo: state.baseInfos.baseInfo,
    fetching: state.baseInfos.fetchingAll,
    error: state.baseInfos.errorAll,
    links: state.baseInfos.links,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    performSearch: (query) => dispatch(BaseInfoActions.baseInfoSearchRequest(query)),
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseInfoScreen);
