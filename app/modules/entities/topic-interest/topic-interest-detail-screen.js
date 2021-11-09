import React from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import TopicInterestActions from './topic-interest.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import TopicInterestDeleteModal from './topic-interest-delete-modal';
import styles from './topic-interest-styles';

function TopicInterestDetailScreen(props)
{
  const {route, getTopicInterest, navigation, topicInterest, fetching, error} = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = topicInterest?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() =>
    {
      if (!routeEntityId)
      {
        navigation.navigate('TopicInterest');
      }
      else
      {
        setDeleteModalVisible(false);
        getTopicInterest(routeEntityId);
      }
    }, [routeEntityId, getTopicInterest, navigation]),
  );

  if (!entityId && !fetching && error)
  {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the TopicInterest.</Text>
      </View>
    );
  }
  if (!entityId || fetching || !correctEntityLoaded)
  {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID='topicInterestDetailScrollView'>
      <Text style={styles.label}>Id:</Text>
      <Text>{topicInterest.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID='uuid'>{topicInterest.uuid}</Text>
      {/* Title Field */}
      <Text style={styles.label}>Title:</Text>
      <Text testID='title'>{topicInterest.title}</Text>
      {/* Content Field */}
      <Text style={styles.label}>Content:</Text>
      <Text testID='content'>{topicInterest.content}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID='info'>{String(topicInterest.info ? topicInterest.info.id : '')}</Text>
      <Text style={styles.label}>Post:</Text>
      {topicInterest.posts &&
      topicInterest.posts.map((entity, index) => (
        <Text key={index} testID={`posts-${index}`}>
          {String(entity.id || '')}
        </Text>
      ))}
      <Text style={styles.label}>Page Post:</Text>
      {topicInterest.pagePosts &&
      topicInterest.pagePosts.map((entity, index) => (
        <Text key={index} testID={`pagePosts-${index}`}>
          {String(entity.id || '')}
        </Text>
      ))}
      <Text style={styles.label}>Group Post:</Text>
      {topicInterest.groupPosts &&
      topicInterest.groupPosts.map((entity, index) => (
        <Text key={index} testID={`groupPosts-${index}`}>
          {String(entity.id || '')}
        </Text>
      ))}

      <View style={styles.entityButtons}>
        <RoundedButton
          text='Edit'
          onPress={() => navigation.navigate('TopicInterestEdit', {entityId})}
          accessibilityLabel={'TopicInterest Edit Button'}
          testID='topicInterestEditButton'
        />
        <RoundedButton
          text='Delete'
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'TopicInterest Delete Button'}
          testID='topicInterestDeleteButton'
        />
        {deleteModalVisible && (
          <TopicInterestDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={topicInterest}
            testID='topicInterestDeleteModal'
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) =>
{
  return {
    topicInterest: state.topicInterests.topicInterest,
    error: state.topicInterests.errorOne,
    fetching: state.topicInterests.fetchingOne,
    deleting: state.topicInterests.deleting,
    errorDeleting: state.topicInterests.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getTopicInterest: (id) => dispatch(TopicInterestActions.topicInterestRequest(id)),
    getAllTopicInterests: (options) => dispatch(TopicInterestActions.topicInterestAllRequest(options)),
    deleteTopicInterest: (id) => dispatch(TopicInterestActions.topicInterestDeleteRequest(id)),
    resetTopicInterests: () => dispatch(TopicInterestActions.topicInterestReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicInterestDetailScreen);
