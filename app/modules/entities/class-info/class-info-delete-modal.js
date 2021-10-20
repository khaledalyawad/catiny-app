import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import ClassInfoActions from './class-info.reducer';

import styles from './class-info-styles';

function ClassInfoDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteClassInfo(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('ClassInfo');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete ClassInfo {entity.id}?</Text>
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
    classInfo: state.classInfos.classInfo,
    fetching: state.classInfos.fetchingOne,
    deleting: state.classInfos.deleting,
    errorDeleting: state.classInfos.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getClassInfo: (id) => dispatch(ClassInfoActions.classInfoRequest(id)),
    getAllClassInfos: (options) => dispatch(ClassInfoActions.classInfoAllRequest(options)),
    deleteClassInfo: (id) => dispatch(ClassInfoActions.classInfoDeleteRequest(id)),
    resetClassInfos: () => dispatch(ClassInfoActions.classInfoReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassInfoDeleteModal);
