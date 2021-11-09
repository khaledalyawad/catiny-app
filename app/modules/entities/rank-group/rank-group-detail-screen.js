import React from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import RankGroupActions from './rank-group.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import RankGroupDeleteModal from './rank-group-delete-modal';
import styles from './rank-group-styles';

function RankGroupDetailScreen(props)
{
  const {route, getRankGroup, navigation, rankGroup, fetching, error} = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = rankGroup?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() =>
    {
      if (!routeEntityId)
      {
        navigation.navigate('RankGroup');
      }
      else
      {
        setDeleteModalVisible(false);
        getRankGroup(routeEntityId);
      }
    }, [routeEntityId, getRankGroup, navigation]),
  );

  if (!entityId && !fetching && error)
  {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the RankGroup.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID='rankGroupDetailScrollView'>
      <Text style={styles.label}>Id:</Text>
      <Text>{rankGroup.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID='uuid'>{rankGroup.uuid}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID='info'>{String(rankGroup.info ? rankGroup.info.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text='Edit'
          onPress={() => navigation.navigate('RankGroupEdit', {entityId})}
          accessibilityLabel={'RankGroup Edit Button'}
          testID='rankGroupEditButton'
        />
        <RoundedButton
          text='Delete'
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'RankGroup Delete Button'}
          testID='rankGroupDeleteButton'
        />
        {deleteModalVisible && (
          <RankGroupDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={rankGroup}
            testID='rankGroupDeleteModal'
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) =>
{
  return {
    rankGroup: state.rankGroups.rankGroup,
    error: state.rankGroups.errorOne,
    fetching: state.rankGroups.fetchingOne,
    deleting: state.rankGroups.deleting,
    errorDeleting: state.rankGroups.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getRankGroup: (id) => dispatch(RankGroupActions.rankGroupRequest(id)),
    getAllRankGroups: (options) => dispatch(RankGroupActions.rankGroupAllRequest(options)),
    deleteRankGroup: (id) => dispatch(RankGroupActions.rankGroupDeleteRequest(id)),
    resetRankGroups: () => dispatch(RankGroupActions.rankGroupReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RankGroupDetailScreen);
