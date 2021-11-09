import React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';

import AccountStatusActions from './account-status.reducer';

import styles from './account-status-styles';

function AccountStatusDeleteModal(props)
{
  const {visible, setVisible, entity, navigation, testID} = props;

  const deleteEntity = () =>
  {
    props.deleteAccountStatus(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('AccountStatus');
  };
  return (
    <Modal animationType='slide' transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete AccountStatus {entity.id}?</Text>
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
    accountStatus: state.accountStatuses.accountStatus,
    fetching: state.accountStatuses.fetchingOne,
    deleting: state.accountStatuses.deleting,
    errorDeleting: state.accountStatuses.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getAccountStatus: (id) => dispatch(AccountStatusActions.accountStatusRequest(id)),
    getAllAccountStatuses: (options) => dispatch(AccountStatusActions.accountStatusAllRequest(options)),
    deleteAccountStatus: (id) => dispatch(AccountStatusActions.accountStatusDeleteRequest(id)),
    resetAccountStatuses: () => dispatch(AccountStatusActions.accountStatusReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountStatusDeleteModal);
