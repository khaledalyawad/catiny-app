import React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';

import RankUserActions from './rank-user.reducer';

import styles from './rank-user-styles';

function RankUserDeleteModal(props)
{
  const {visible, setVisible, entity, navigation, testID} = props;

  const deleteEntity = () =>
  {
    props.deleteRankUser(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('RankUser');
  };
  return (
    <Modal animationType='slide' transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete RankUser {entity.id}?</Text>
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
    rankUser: state.rankUsers.rankUser,
    fetching: state.rankUsers.fetchingOne,
    deleting: state.rankUsers.deleting,
    errorDeleting: state.rankUsers.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getRankUser: (id) => dispatch(RankUserActions.rankUserRequest(id)),
    getAllRankUsers: (options) => dispatch(RankUserActions.rankUserAllRequest(options)),
    deleteRankUser: (id) => dispatch(RankUserActions.rankUserDeleteRequest(id)),
    resetRankUsers: () => dispatch(RankUserActions.rankUserReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RankUserDeleteModal);
