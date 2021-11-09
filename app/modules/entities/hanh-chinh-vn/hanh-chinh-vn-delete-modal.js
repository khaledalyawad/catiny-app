import React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';

import HanhChinhVNActions from './hanh-chinh-vn.reducer';

import styles from './hanh-chinh-vn-styles';

function HanhChinhVNDeleteModal(props)
{
  const {visible, setVisible, entity, navigation, testID} = props;

  const deleteEntity = () =>
  {
    props.deleteHanhChinhVN(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('HanhChinhVN');
  };
  return (
    <Modal animationType='slide' transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete HanhChinhVN {entity.id}?</Text>
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
    hanhChinhVN: state.hanhChinhVNS.hanhChinhVN,
    fetching: state.hanhChinhVNS.fetchingOne,
    deleting: state.hanhChinhVNS.deleting,
    errorDeleting: state.hanhChinhVNS.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getHanhChinhVN: (id) => dispatch(HanhChinhVNActions.hanhChinhVNRequest(id)),
    getAllHanhChinhVNS: (options) => dispatch(HanhChinhVNActions.hanhChinhVNAllRequest(options)),
    deleteHanhChinhVN: (id) => dispatch(HanhChinhVNActions.hanhChinhVNDeleteRequest(id)),
    resetHanhChinhVNS: () => dispatch(HanhChinhVNActions.hanhChinhVNReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HanhChinhVNDeleteModal);
