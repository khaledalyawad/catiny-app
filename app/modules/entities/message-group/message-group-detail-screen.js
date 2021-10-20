import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import MessageGroupActions from './message-group.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import MessageGroupDeleteModal from './message-group-delete-modal';
import styles from './message-group-styles';

function MessageGroupDetailScreen(props) {
  const { route, getMessageGroup, navigation, messageGroup, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = messageGroup?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('MessageGroup');
      } else {
        setDeleteModalVisible(false);
        getMessageGroup(routeEntityId);
      }
    }, [routeEntityId, getMessageGroup, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the MessageGroup.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="messageGroupDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{messageGroup.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID="uuid">{messageGroup.uuid}</Text>
      {/* GroupName Field */}
      <Text style={styles.label}>GroupName:</Text>
      <Text testID="groupName">{messageGroup.groupName}</Text>
      {/* Avatar Field */}
      <Text style={styles.label}>Avatar:</Text>
      <Text testID="avatar">{messageGroup.avatar}</Text>
      {/* AddBy Field */}
      <Text style={styles.label}>AddBy:</Text>
      <Text testID="addBy">{messageGroup.addBy}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID="info">{String(messageGroup.info ? messageGroup.info.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('MessageGroupEdit', { entityId })}
          accessibilityLabel={'MessageGroup Edit Button'}
          testID="messageGroupEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'MessageGroup Delete Button'}
          testID="messageGroupDeleteButton"
        />
        {deleteModalVisible && (
          <MessageGroupDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={messageGroup}
            testID="messageGroupDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    messageGroup: state.messageGroups.messageGroup,
    error: state.messageGroups.errorOne,
    fetching: state.messageGroups.fetchingOne,
    deleting: state.messageGroups.deleting,
    errorDeleting: state.messageGroups.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMessageGroup: (id) => dispatch(MessageGroupActions.messageGroupRequest(id)),
    getAllMessageGroups: (options) => dispatch(MessageGroupActions.messageGroupAllRequest(options)),
    deleteMessageGroup: (id) => dispatch(MessageGroupActions.messageGroupDeleteRequest(id)),
    resetMessageGroups: () => dispatch(MessageGroupActions.messageGroupReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageGroupDetailScreen);
