import React from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import RankUserActions from './rank-user.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import RankUserDeleteModal from './rank-user-delete-modal';
import styles from './rank-user-styles';

function RankUserDetailScreen(props)
{
  const {route, getRankUser, navigation, rankUser, fetching, error} = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = rankUser?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() =>
    {
      if (!routeEntityId)
      {
        navigation.navigate('RankUser');
      }
      else
      {
        setDeleteModalVisible(false);
        getRankUser(routeEntityId);
      }
    }, [routeEntityId, getRankUser, navigation]),
  );

  if (!entityId && !fetching && error)
  {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the RankUser.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID='rankUserDetailScrollView'>
      <Text style={styles.label}>Id:</Text>
      <Text>{rankUser.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID='uuid'>{rankUser.uuid}</Text>
      {/* RatingPoints Field */}
      <Text style={styles.label}>RatingPoints:</Text>
      <Text testID='ratingPoints'>{rankUser.ratingPoints}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID='info'>{String(rankUser.info ? rankUser.info.id : '')}</Text>
      <Text style={styles.label}>Rank Group:</Text>
      <Text testID='rankGroup'>{String(rankUser.rankGroup ? rankUser.rankGroup.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text='Edit'
          onPress={() => navigation.navigate('RankUserEdit', {entityId})}
          accessibilityLabel={'RankUser Edit Button'}
          testID='rankUserEditButton'
        />
        <RoundedButton
          text='Delete'
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'RankUser Delete Button'}
          testID='rankUserDeleteButton'
        />
        {deleteModalVisible && (
          <RankUserDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={rankUser}
            testID='rankUserDeleteModal'
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) =>
{
  return {
    rankUser: state.rankUsers.rankUser,
    error: state.rankUsers.errorOne,
    fetching: state.rankUsers.fetchingOne,
    deleting: state.rankUsers.deleting,
    errorDeleting: state.rankUsers.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getRankUser: (id) => dispatch(RankUserActions.rankUserRequest(id)),
    getAllRankUsers: (options) => dispatch(RankUserActions.rankUserAllRequest(options)),
    deleteRankUser: (id) => dispatch(RankUserActions.rankUserDeleteRequest(id)),
    resetRankUsers: () => dispatch(RankUserActions.rankUserReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RankUserDetailScreen);
