import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import ClassInfoActions from './class-info.reducer';
import styles from './class-info-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function ClassInfoScreen(props)
{
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const {classInfo, classInfoList, getAllClassInfos, fetching} = props;

  useFocusEffect(
    React.useCallback(() =>
    {
      console.debug('ClassInfo entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchClassInfos();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [classInfo, fetchClassInfos]),
  );

  const renderRow = ({item}) =>
  {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ClassInfoDetail', {entityId: item.id})}>
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
  const renderEmpty = () => <AlertMessage title='No ClassInfos Found' show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () =>
  {
    setSearchTerm('');
    fetchClassInfos();
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
  const fetchClassInfos = React.useCallback(() =>
  {
    getAllClassInfos({page: page - 1, sort, size});
  }, [getAllClassInfos, page, sort, size]);

  const handleLoadMore = () =>
  {
    if (page < props.links.next || props.links.next === undefined || fetching)
    {
      return;
    }
    setPage(page + 1);
    fetchClassInfos();
  };
  return (
    <View style={styles.container} testID='classInfoScreen'>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={classInfoList}
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
    classInfoList: state.classInfos.classInfoList,
    classInfo: state.classInfos.classInfo,
    fetching: state.classInfos.fetchingAll,
    error: state.classInfos.errorAll,
    links: state.classInfos.links,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    performSearch: (query) => dispatch(ClassInfoActions.classInfoSearchRequest(query)),
    getAllClassInfos: (options) => dispatch(ClassInfoActions.classInfoAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassInfoScreen);
