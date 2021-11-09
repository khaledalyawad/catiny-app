import React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';

import HistoryUpdateActions from './history-update.reducer';

import styles from './history-update-styles';

function HistoryUpdateDeleteModal(props)
{
  const {visible, setVisible, entity, navigation, testID} = props;

  const deleteEntity = () =>
  {
    props.deleteHistoryUpdate(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('HistoryUpdate');
  };
  return (
    <Modal animationType='slide' transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete HistoryUpdate {entity.id}?</Text>
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
    historyUpdate: state.historyUpdates.historyUpdate,
    fetching: state.historyUpdates.fetchingOne,
    deleting: state.historyUpdates.deleting,
    errorDeleting: state.historyUpdates.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getHistoryUpdate: (id) => dispatch(HistoryUpdateActions.historyUpdateRequest(id)),
    getAllHistoryUpdates: (options) => dispatch(HistoryUpdateActions.historyUpdateAllRequest(options)),
    deleteHistoryUpdate: (id) => dispatch(HistoryUpdateActions.historyUpdateDeleteRequest(id)),
    resetHistoryUpdates: () => dispatch(HistoryUpdateActions.historyUpdateReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryUpdateDeleteModal);
