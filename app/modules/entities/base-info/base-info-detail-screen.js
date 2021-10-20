import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import BaseInfoActions from './base-info.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import BaseInfoDeleteModal from './base-info-delete-modal';
import styles from './base-info-styles';

function BaseInfoDetailScreen(props) {
  const { route, getBaseInfo, navigation, baseInfo, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = baseInfo?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('BaseInfo');
      } else {
        setDeleteModalVisible(false);
        getBaseInfo(routeEntityId);
      }
    }, [routeEntityId, getBaseInfo, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the BaseInfo.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="baseInfoDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{baseInfo.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID="uuid">{baseInfo.uuid}</Text>
      {/* ProcessStatus Field */}
      <Text style={styles.label}>ProcessStatus:</Text>
      <Text testID="processStatus">{baseInfo.processStatus}</Text>
      {/* ModifiedClass Field */}
      <Text style={styles.label}>ModifiedClass:</Text>
      <Text testID="modifiedClass">{baseInfo.modifiedClass}</Text>
      {/* CreatedDate Field */}
      <Text style={styles.label}>CreatedDate:</Text>
      <Text testID="createdDate">{String(baseInfo.createdDate)}</Text>
      {/* ModifiedDate Field */}
      <Text style={styles.label}>ModifiedDate:</Text>
      <Text testID="modifiedDate">{String(baseInfo.modifiedDate)}</Text>
      {/* Notes Field */}
      <Text style={styles.label}>Notes:</Text>
      <Text testID="notes">{baseInfo.notes}</Text>
      {/* Deleted Field */}
      <Text style={styles.label}>Deleted:</Text>
      <Text testID="deleted">{String(baseInfo.deleted)}</Text>
      {/* PriorityIndex Field */}
      <Text style={styles.label}>PriorityIndex:</Text>
      <Text testID="priorityIndex">{baseInfo.priorityIndex}</Text>
      {/* CountUse Field */}
      <Text style={styles.label}>CountUse:</Text>
      <Text testID="countUse">{baseInfo.countUse}</Text>
      <Text style={styles.label}>Created By:</Text>
      <Text testID="createdBy">{String(baseInfo.createdBy ? baseInfo.createdBy.id : '')}</Text>
      <Text style={styles.label}>Modified By:</Text>
      <Text testID="modifiedBy">{String(baseInfo.modifiedBy ? baseInfo.modifiedBy.id : '')}</Text>
      <Text style={styles.label}>Owner:</Text>
      <Text testID="owner">{String(baseInfo.owner ? baseInfo.owner.id : '')}</Text>
      <Text style={styles.label}>Class Info:</Text>
      <Text testID="classInfo">{String(baseInfo.classInfo ? baseInfo.classInfo.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('BaseInfoEdit', { entityId })}
          accessibilityLabel={'BaseInfo Edit Button'}
          testID="baseInfoEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'BaseInfo Delete Button'}
          testID="baseInfoDeleteButton"
        />
        {deleteModalVisible && (
          <BaseInfoDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={baseInfo}
            testID="baseInfoDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    baseInfo: state.baseInfos.baseInfo,
    error: state.baseInfos.errorOne,
    fetching: state.baseInfos.fetchingOne,
    deleting: state.baseInfos.deleting,
    errorDeleting: state.baseInfos.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBaseInfo: (id) => dispatch(BaseInfoActions.baseInfoRequest(id)),
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    deleteBaseInfo: (id) => dispatch(BaseInfoActions.baseInfoDeleteRequest(id)),
    resetBaseInfos: () => dispatch(BaseInfoActions.baseInfoReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseInfoDetailScreen);
