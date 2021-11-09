import React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';

import BaseInfoActions from './base-info.reducer';

import styles from './base-info-styles';

function BaseInfoDeleteModal(props)
{
  const {visible, setVisible, entity, navigation, testID} = props;

  const deleteEntity = () =>
  {
    props.deleteBaseInfo(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('BaseInfo');
  };
  return (
    <Modal animationType='slide' transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete BaseInfo {entity.id}?</Text>
          </View>
          <View style={[styles.flexRow]}>
            <TouchableHighlight
              style={[styles.openButton, styles.cancelButton]}
              onPress={() =>
              {
                setVisible(false);
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.openButton, styles.submitButton]} onPress={deleteEntity} testID='deleteButton'>
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const mapStateToProps = (state) =>
{
  return {
    baseInfo: state.baseInfos.baseInfo,
    fetching: state.baseInfos.fetchingOne,
    deleting: state.baseInfos.deleting,
    errorDeleting: state.baseInfos.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getBaseInfo: (id) => dispatch(BaseInfoActions.baseInfoRequest(id)),
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    deleteBaseInfo: (id) => dispatch(BaseInfoActions.baseInfoDeleteRequest(id)),
    resetBaseInfos: () => dispatch(BaseInfoActions.baseInfoReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseInfoDeleteModal);
