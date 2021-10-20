import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import HistoryUpdateActions from './history-update.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import HistoryUpdateDeleteModal from './history-update-delete-modal';
import styles from './history-update-styles';

function HistoryUpdateDetailScreen(props) {
  const { route, getHistoryUpdate, navigation, historyUpdate, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = historyUpdate?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('HistoryUpdate');
      } else {
        setDeleteModalVisible(false);
        getHistoryUpdate(routeEntityId);
      }
    }, [routeEntityId, getHistoryUpdate, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the HistoryUpdate.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="historyUpdateDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{historyUpdate.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID="uuid">{historyUpdate.uuid}</Text>
      {/* Version Field */}
      <Text style={styles.label}>Version:</Text>
      <Text testID="version">{historyUpdate.version}</Text>
      {/* Content Field */}
      <Text style={styles.label}>Content:</Text>
      <Text testID="content">{historyUpdate.content}</Text>
      <Text style={styles.label}>Base Info:</Text>
      <Text testID="baseInfo">{String(historyUpdate.baseInfo ? historyUpdate.baseInfo.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('HistoryUpdateEdit', { entityId })}
          accessibilityLabel={'HistoryUpdate Edit Button'}
          testID="historyUpdateEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'HistoryUpdate Delete Button'}
          testID="historyUpdateDeleteButton"
        />
        {deleteModalVisible && (
          <HistoryUpdateDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={historyUpdate}
            testID="historyUpdateDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    historyUpdate: state.historyUpdates.historyUpdate,
    error: state.historyUpdates.errorOne,
    fetching: state.historyUpdates.fetchingOne,
    deleting: state.historyUpdates.deleting,
    errorDeleting: state.historyUpdates.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHistoryUpdate: (id) => dispatch(HistoryUpdateActions.historyUpdateRequest(id)),
    getAllHistoryUpdates: (options) => dispatch(HistoryUpdateActions.historyUpdateAllRequest(options)),
    deleteHistoryUpdate: (id) => dispatch(HistoryUpdateActions.historyUpdateDeleteRequest(id)),
    resetHistoryUpdates: () => dispatch(HistoryUpdateActions.historyUpdateReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryUpdateDetailScreen);
