import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import PermissionActions from './permission.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import PermissionDeleteModal from './permission-delete-modal';
import styles from './permission-styles';

function PermissionDetailScreen(props) {
  const { route, getPermission, navigation, permission, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = permission?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Permission');
      } else {
        setDeleteModalVisible(false);
        getPermission(routeEntityId);
      }
    }, [routeEntityId, getPermission, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Permission.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="permissionDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{permission.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID="uuid">{permission.uuid}</Text>
      {/* Read Field */}
      <Text style={styles.label}>Read:</Text>
      <Text testID="read">{String(permission.read)}</Text>
      {/* Write Field */}
      <Text style={styles.label}>Write:</Text>
      <Text testID="write">{String(permission.write)}</Text>
      {/* Share Field */}
      <Text style={styles.label}>Share:</Text>
      <Text testID="share">{String(permission.share)}</Text>
      {/* Delete Field */}
      <Text style={styles.label}>Delete:</Text>
      <Text testID="delete">{String(permission.delete)}</Text>
      {/* Add Field */}
      <Text style={styles.label}>Add:</Text>
      <Text testID="add">{String(permission.add)}</Text>
      {/* Level Field */}
      <Text style={styles.label}>Level:</Text>
      <Text testID="level">{permission.level}</Text>
      <Text style={styles.label}>Base Info:</Text>
      <Text testID="baseInfo">{String(permission.baseInfo ? permission.baseInfo.id : '')}</Text>
      <Text style={styles.label}>Owner:</Text>
      <Text testID="owner">{String(permission.owner ? permission.owner.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('PermissionEdit', { entityId })}
          accessibilityLabel={'Permission Edit Button'}
          testID="permissionEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Permission Delete Button'}
          testID="permissionDeleteButton"
        />
        {deleteModalVisible && (
          <PermissionDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={permission}
            testID="permissionDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    permission: state.permissions.permission,
    error: state.permissions.errorOne,
    fetching: state.permissions.fetchingOne,
    deleting: state.permissions.deleting,
    errorDeleting: state.permissions.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPermission: (id) => dispatch(PermissionActions.permissionRequest(id)),
    getAllPermissions: (options) => dispatch(PermissionActions.permissionAllRequest(options)),
    deletePermission: (id) => dispatch(PermissionActions.permissionDeleteRequest(id)),
    resetPermissions: () => dispatch(PermissionActions.permissionReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PermissionDetailScreen);
