import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import FileInfoActions from './file-info.reducer';
import styles from './file-info-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function FileInfoScreen(props)
{
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const {fileInfo, fileInfoList, getAllFileInfos, fetching} = props;

  useFocusEffect(
    React.useCallback(() =>
    {
      console.debug('FileInfo entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchFileInfos();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [fileInfo, fetchFileInfos]),
  );

  const renderRow = ({item}) =>
  {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('FileInfoDetail', {entityId: item.id})}>
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
  const renderEmpty = () => <AlertMessage title='No FileInfos Found' show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () =>
  {
    setSearchTerm('');
    fetchFileInfos();
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
  const fetchFileInfos = React.useCallback(() =>
  {
    getAllFileInfos({page: page - 1, sort, size});
  }, [getAllFileInfos, page, sort, size]);

  const handleLoadMore = () =>
  {
    if (page < props.links.next || props.links.next === undefined || fetching)
    {
      return;
    }
    setPage(page + 1);
    fetchFileInfos();
  };
  return (
    <View style={styles.container} testID='fileInfoScreen'>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={fileInfoList}
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
    fileInfoList: state.fileInfos.fileInfoList,
    fileInfo: state.fileInfos.fileInfo,
    fetching: state.fileInfos.fetchingAll,
    error: state.fileInfos.errorAll,
    links: state.fileInfos.links,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    performSearch: (query) => dispatch(FileInfoActions.fileInfoSearchRequest(query)),
    getAllFileInfos: (options) => dispatch(FileInfoActions.fileInfoAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileInfoScreen);
