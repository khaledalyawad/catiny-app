import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../../shared/components/search-bar/search-bar';
import EventActions from './event.reducer';
import styles from './event-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function EventScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  const [searchTerm, setSearchTerm] = React.useState('');

  const { event, eventList, getAllEvents, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Event entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchEvents();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [event, fetchEvents]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('EventDetail', { entityId: item.id })}>
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
  const renderEmpty = () => <AlertMessage title="No Events Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const cancelSearch = () => {
    setSearchTerm('');
    fetchEvents();
  };

  const performSearch = (query) => {
    if (query === '') {
      cancelSearch();
      return;
    }
    setSearchTerm(query);
    props.performSearch(query);
  };
  const fetchEvents = React.useCallback(() => {
    getAllEvents({ page: page - 1, sort, size });
  }, [getAllEvents, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchEvents();
  };
  return (
    <View style={styles.container} testID="eventScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={eventList}
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
    eventList: state.events.eventList,
    event: state.events.event,
    fetching: state.events.fetchingAll,
    error: state.events.errorAll,
    links: state.events.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(EventActions.eventSearchRequest(query)),
    getAllEvents: (options) => dispatch(EventActions.eventAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventScreen);
