import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import FileInfoActions from './file-info.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import FileInfoDeleteModal from './file-info-delete-modal';
import styles from './file-info-styles';

function FileInfoDetailScreen(props) {
  const { route, getFileInfo, navigation, fileInfo, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = fileInfo?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('FileInfo');
      } else {
        setDeleteModalVisible(false);
        getFileInfo(routeEntityId);
      }
    }, [routeEntityId, getFileInfo, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the FileInfo.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="fileInfoDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{fileInfo.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID="uuid">{fileInfo.uuid}</Text>
      {/* NameFile Field */}
      <Text style={styles.label}>NameFile:</Text>
      <Text testID="nameFile">{fileInfo.nameFile}</Text>
      {/* TypeFile Field */}
      <Text style={styles.label}>TypeFile:</Text>
      <Text testID="typeFile">{fileInfo.typeFile}</Text>
      {/* Path Field */}
      <Text style={styles.label}>Path:</Text>
      <Text testID="path">{fileInfo.path}</Text>
      {/* DataSize Field */}
      <Text style={styles.label}>DataSize:</Text>
      <Text testID="dataSize">{fileInfo.dataSize}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID="info">{String(fileInfo.info ? fileInfo.info.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('FileInfoEdit', { entityId })}
          accessibilityLabel={'FileInfo Edit Button'}
          testID="fileInfoEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'FileInfo Delete Button'}
          testID="fileInfoDeleteButton"
        />
        {deleteModalVisible && (
          <FileInfoDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={fileInfo}
            testID="fileInfoDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    fileInfo: state.fileInfos.fileInfo,
    error: state.fileInfos.errorOne,
    fetching: state.fileInfos.fetchingOne,
    deleting: state.fileInfos.deleting,
    errorDeleting: state.fileInfos.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFileInfo: (id) => dispatch(FileInfoActions.fileInfoRequest(id)),
    getAllFileInfos: (options) => dispatch(FileInfoActions.fileInfoAllRequest(options)),
    deleteFileInfo: (id) => dispatch(FileInfoActions.fileInfoDeleteRequest(id)),
    resetFileInfos: () => dispatch(FileInfoActions.fileInfoReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileInfoDetailScreen);
