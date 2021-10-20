import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import RankGroupActions from './rank-group.reducer';

import styles from './rank-group-styles';

function RankGroupDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteRankGroup(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('RankGroup');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete RankGroup {entity.id}?</Text>
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
    rankGroup: state.rankGroups.rankGroup,
    fetching: state.rankGroups.fetchingOne,
    deleting: state.rankGroups.deleting,
    errorDeleting: state.rankGroups.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRankGroup: (id) => dispatch(RankGroupActions.rankGroupRequest(id)),
    getAllRankGroups: (options) => dispatch(RankGroupActions.rankGroupAllRequest(options)),
    deleteRankGroup: (id) => dispatch(RankGroupActions.rankGroupDeleteRequest(id)),
    resetRankGroups: () => dispatch(RankGroupActions.rankGroupReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RankGroupDeleteModal);
