import React from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import MasterUserActions from './master-user.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import MasterUserDeleteModal from './master-user-delete-modal';
import styles from './master-user-styles';

function MasterUserDetailScreen(props)
{
  const {route, getMasterUser, navigation, masterUser, fetching, error} = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = masterUser?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() =>
    {
      if (!routeEntityId)
      {
        navigation.navigate('MasterUser');
      }
      else
      {
        setDeleteModalVisible(false);
        getMasterUser(routeEntityId);
      }
    }, [routeEntityId, getMasterUser, navigation]),
  );

  if (!entityId && !fetching && error)
  {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the MasterUser.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID='masterUserDetailScrollView'>
      <Text style={styles.label}>Id:</Text>
      <Text>{masterUser.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID='uuid'>{masterUser.uuid}</Text>
      {/* FullName Field */}
      <Text style={styles.label}>FullName:</Text>
      <Text testID='fullName'>{masterUser.fullName}</Text>
      {/* Nickname Field */}
      <Text style={styles.label}>Nickname:</Text>
      <Text testID='nickname'>{masterUser.nickname}</Text>
      {/* Avatar Field */}
      <Text style={styles.label}>Avatar:</Text>
      <Text testID='avatar'>{masterUser.avatar}</Text>
      {/* QuickInfo Field */}
      <Text style={styles.label}>QuickInfo:</Text>
      <Text testID='quickInfo'>{masterUser.quickInfo}</Text>
      <Text style={styles.label}>User:</Text>
      <Text testID='user'>{String(masterUser.user ? masterUser.user.id : '')}</Text>
      <Text style={styles.label}>My Rank:</Text>
      <Text testID='myRank'>{String(masterUser.myRank ? masterUser.myRank.id : '')}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID='info'>{String(masterUser.info ? masterUser.info.id : '')}</Text>
      <Text style={styles.label}>Topic Interest:</Text>
      {masterUser.topicInterests &&
      masterUser.topicInterests.map((entity, index) => (
        <Text key={index} testID={`topicInterests-${index}`}>
          {String(entity.id || '')}
        </Text>
      ))}

      <View style={styles.entityButtons}>
        <RoundedButton
          text='Edit'
          onPress={() => navigation.navigate('MasterUserEdit', {entityId})}
          accessibilityLabel={'MasterUser Edit Button'}
          testID='masterUserEditButton'
        />
        <RoundedButton
          text='Delete'
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'MasterUser Delete Button'}
          testID='masterUserDeleteButton'
        />
        {deleteModalVisible && (
          <MasterUserDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={masterUser}
            testID='masterUserDeleteModal'
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) =>
{
  return {
    masterUser: state.masterUsers.masterUser,
    error: state.masterUsers.errorOne,
    fetching: state.masterUsers.fetchingOne,
    deleting: state.masterUsers.deleting,
    errorDeleting: state.masterUsers.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getMasterUser: (id) => dispatch(MasterUserActions.masterUserRequest(id)),
    getAllMasterUsers: (options) => dispatch(MasterUserActions.masterUserAllRequest(options)),
    deleteMasterUser: (id) => dispatch(MasterUserActions.masterUserDeleteRequest(id)),
    resetMasterUsers: () => dispatch(MasterUserActions.masterUserReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MasterUserDetailScreen);
