import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import NewsFeedActions from './news-feed.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import NewsFeedDeleteModal from './news-feed-delete-modal';
import styles from './news-feed-styles';

function NewsFeedDetailScreen(props) {
  const { route, getNewsFeed, navigation, newsFeed, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = newsFeed?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('NewsFeed');
      } else {
        setDeleteModalVisible(false);
        getNewsFeed(routeEntityId);
      }
    }, [routeEntityId, getNewsFeed, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the NewsFeed.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="newsFeedDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{newsFeed.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID="uuid">{newsFeed.uuid}</Text>
      {/* PriorityIndex Field */}
      <Text style={styles.label}>PriorityIndex:</Text>
      <Text testID="priorityIndex">{newsFeed.priorityIndex}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID="info">{String(newsFeed.info ? newsFeed.info.id : '')}</Text>
      <Text style={styles.label}>Post:</Text>
      <Text testID="post">{String(newsFeed.post ? newsFeed.post.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('NewsFeedEdit', { entityId })}
          accessibilityLabel={'NewsFeed Edit Button'}
          testID="newsFeedEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'NewsFeed Delete Button'}
          testID="newsFeedDeleteButton"
        />
        {deleteModalVisible && (
          <NewsFeedDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={newsFeed}
            testID="newsFeedDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    newsFeed: state.newsFeeds.newsFeed,
    error: state.newsFeeds.errorOne,
    fetching: state.newsFeeds.fetchingOne,
    deleting: state.newsFeeds.deleting,
    errorDeleting: state.newsFeeds.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNewsFeed: (id) => dispatch(NewsFeedActions.newsFeedRequest(id)),
    getAllNewsFeeds: (options) => dispatch(NewsFeedActions.newsFeedAllRequest(options)),
    deleteNewsFeed: (id) => dispatch(NewsFeedActions.newsFeedDeleteRequest(id)),
    resetNewsFeeds: () => dispatch(NewsFeedActions.newsFeedReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedDetailScreen);
