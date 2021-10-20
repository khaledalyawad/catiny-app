import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import FileInfoActions from './file-info.reducer';

import styles from './file-info-styles';

function FileInfoDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteFileInfo(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('FileInfo');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete FileInfo {entity.id}?</Text>
          </View>
          <View style={[styles.flexRow]}>
            <TouchableHighlight
              style={[styles.openButton, styles.cancelButton]}
              onPress={() => {
                setVisible(false);
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.openButton, styles.submitButton]} onPress={deleteEntity} testID="deleteButton">
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    fileInfo: state.fileInfos.fileInfo,
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

export default connect(mapStateToProps, mapDispatchToProps)(FileInfoDeleteModal);
