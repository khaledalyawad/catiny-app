import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import EventActions from './event.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import EventDeleteModal from './event-delete-modal';
import styles from './event-styles';

function EventDetailScreen(props) {
  const { route, getEvent, navigation, event, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = event?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Event');
      } else {
        setDeleteModalVisible(false);
        getEvent(routeEntityId);
      }
    }, [routeEntityId, getEvent, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Event.</Text>
      </View>
    );
  }
  if (!entityId || fetching || !correctEntityLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="eventDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{event.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID="uuid">{event.uuid}</Text>
      {/* Title Field */}
      <Text style={styles.label}>Title:</Text>
      <Text testID="title">{event.title}</Text>
      {/* Avatar Field */}
      <Text style={styles.label}>Avatar:</Text>
      <Text testID="avatar">{event.avatar}</Text>
      {/* Content Field */}
      <Text style={styles.label}>Content:</Text>
      <Text testID="content">{event.content}</Text>
      {/* Type Field */}
      <Text style={styles.label}>Type:</Text>
      <Text testID="type">{event.type}</Text>
      {/* Description Field */}
      <Text style={styles.label}>Description:</Text>
      <Text testID="description">{event.description}</Text>
      {/* StartTime Field */}
      <Text style={styles.label}>StartTime:</Text>
      <Text testID="startTime">{String(event.startTime)}</Text>
      {/* EndTime Field */}
      <Text style={styles.label}>EndTime:</Text>
      <Text testID="endTime">{String(event.endTime)}</Text>
      {/* TagLine Field */}
      <Text style={styles.label}>TagLine:</Text>
      <Text testID="tagLine">{event.tagLine}</Text>
      {/* ImageCollection Field */}
      <Text style={styles.label}>ImageCollection:</Text>
      <Text testID="imageCollection">{event.imageCollection}</Text>
      {/* VideoCollection Field */}
      <Text style={styles.label}>VideoCollection:</Text>
      <Text testID="videoCollection">{event.videoCollection}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID="info">{String(event.info ? event.info.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('EventEdit', { entityId })}
          accessibilityLabel={'Event Edit Button'}
          testID="eventEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Event Delete Button'}
          testID="eventDeleteButton"
        />
        {deleteModalVisible && (
          <EventDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={event}
            testID="eventDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    event: state.events.event,
    error: state.events.errorOne,
    fetching: state.events.fetchingOne,
    deleting: state.events.deleting,
    errorDeleting: state.events.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEvent: (id) => dispatch(EventActions.eventRequest(id)),
    getAllEvents: (options) => dispatch(EventActions.eventAllRequest(options)),
    deleteEvent: (id) => dispatch(EventActions.eventDeleteRequest(id)),
    resetEvents: () => dispatch(EventActions.eventReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailScreen);
