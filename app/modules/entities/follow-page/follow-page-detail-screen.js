import React from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import FollowPageActions from './follow-page.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import FollowPageDeleteModal from './follow-page-delete-modal';
import styles from './follow-page-styles';

function FollowPageDetailScreen(props)
{
  const {route, getFollowPage, navigation, followPage, fetching, error} = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = followPage?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() =>
    {
      if (!routeEntityId)
      {
        navigation.navigate('FollowPage');
      }
      else
      {
        setDeleteModalVisible(false);
        getFollowPage(routeEntityId);
      }
    }, [routeEntityId, getFollowPage, navigation]),
  );

  if (!entityId && !fetching && error)
  {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the FollowPage.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID='followPageDetailScrollView'>
      <Text style={styles.label}>Id:</Text>
      <Text>{followPage.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID='uuid'>{followPage.uuid}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID='info'>{String(followPage.info ? followPage.info.id : '')}</Text>
      <Text style={styles.label}>Page Details:</Text>
      <Text testID='pageDetails'>{String(followPage.pageDetails ? followPage.pageDetails.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text='Edit'
          onPress={() => navigation.navigate('FollowPageEdit', {entityId})}
          accessibilityLabel={'FollowPage Edit Button'}
          testID='followPageEditButton'
        />
        <RoundedButton
          text='Delete'
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'FollowPage Delete Button'}
          testID='followPageDeleteButton'
        />
        {deleteModalVisible && (
          <FollowPageDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={followPage}
            testID='followPageDeleteModal'
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) =>
{
  return {
    followPage: state.followPages.followPage,
    error: state.followPages.errorOne,
    fetching: state.followPages.fetchingOne,
    deleting: state.followPages.deleting,
    errorDeleting: state.followPages.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getFollowPage: (id) => dispatch(FollowPageActions.followPageRequest(id)),
    getAllFollowPages: (options) => dispatch(FollowPageActions.followPageAllRequest(options)),
    deleteFollowPage: (id) => dispatch(FollowPageActions.followPageDeleteRequest(id)),
    resetFollowPages: () => dispatch(FollowPageActions.followPageReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowPageDetailScreen);
