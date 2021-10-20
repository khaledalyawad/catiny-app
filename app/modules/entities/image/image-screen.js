import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import ImageActions from './image.reducer';
import styles from './image-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function ImageScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const { image, imageList, getAllImages, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Image entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchImages();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [image, fetchImages]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ImageDetail', { entityId: item.id })}>
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
  const renderEmpty = () => <AlertMessage title="No Images Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () => {
    setSearchTerm('');
    fetchImages();
  };

  const performSearch = (query) => {
    if (query === '') {
      cancelSearch();
      return;
    }
    setSearchTerm(query);
    props.performSearch(query);
  };
  const fetchImages = React.useCallback(() => {
    getAllImages({ page: page - 1, sort, size });
  }, [getAllImages, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchImages();
  };
  return (
    <View style={styles.container} testID="imageScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={imageList}
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
    imageList: state.images.imageList,
    image: state.images.image,
    fetching: state.images.fetchingAll,
    error: state.images.errorAll,
    links: state.images.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(ImageActions.imageSearchRequest(query)),
    getAllImages: (options) => dispatch(ImageActions.imageAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageScreen);
