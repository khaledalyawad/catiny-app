import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import MessageContentActions from './message-content.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import MessageContentDeleteModal from './message-content-delete-modal';
import styles from './message-content-styles';

function MessageContentDetailScreen(props) {
  const { route, getMessageContent, navigation, messageContent, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = messageContent?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('MessageContent');
      } else {
        setDeleteModalVisible(false);
        getMessageContent(routeEntityId);
      }
    }, [routeEntityId, getMessageContent, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the MessageContent.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="messageContentDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{messageContent.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID="uuid">{messageContent.uuid}</Text>
      {/* SenderName Field */}
      <Text style={styles.label}>SenderName:</Text>
      <Text testID="senderName">{messageContent.senderName}</Text>
      {/* Attach Field */}
      <Text style={styles.label}>Attach:</Text>
      <Text testID="attach">{messageContent.attach}</Text>
      {/* Content Field */}
      <Text style={styles.label}>Content:</Text>
      <Text testID="content">{messageContent.content}</Text>
      {/* Status Field */}
      <Text style={styles.label}>Status:</Text>
      <Text testID="status">{messageContent.status}</Text>
      {/* SearchField Field */}
      <Text style={styles.label}>SearchField:</Text>
      <Text testID="searchField">{messageContent.searchField}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID="info">{String(messageContent.info ? messageContent.info.id : '')}</Text>
      <Text style={styles.label}>Group:</Text>
      <Text testID="group">{String(messageContent.group ? messageContent.group.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('MessageContentEdit', { entityId })}
          accessibilityLabel={'MessageContent Edit Button'}
          testID="messageContentEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'MessageContent Delete Button'}
          testID="messageContentDeleteButton"
        />
        {deleteModalVisible && (
          <MessageContentDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={messageContent}
            testID="messageContentDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    messageContent: state.messageContents.messageContent,
    error: state.messageContents.errorOne,
    fetching: state.messageContents.fetchingOne,
    deleting: state.messageContents.deleting,
    errorDeleting: state.messageContents.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMessageContent: (id) => dispatch(MessageContentActions.messageContentRequest(id)),
    getAllMessageContents: (options) => dispatch(MessageContentActions.messageContentAllRequest(options)),
    deleteMessageContent: (id) => dispatch(MessageContentActions.messageContentDeleteRequest(id)),
    resetMessageContents: () => dispatch(MessageContentActions.messageContentReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageContentDetailScreen);
