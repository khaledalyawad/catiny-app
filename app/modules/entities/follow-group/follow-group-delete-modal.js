import React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';

import FollowGroupActions from './follow-group.reducer';

import styles from './follow-group-styles';

function FollowGroupDeleteModal(props)
{
  const {visible, setVisible, entity, navigation, testID} = props;

  const deleteEntity = () =>
  {
    props.deleteFollowGroup(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('FollowGroup');
  };
  return (
    <Modal animationType='slide' transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete FollowGroup {entity.id}?</Text>
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
    followGroup: state.followGroups.followGroup,
    fetching: state.followGroups.fetchingOne,
    deleting: state.followGroups.deleting,
    errorDeleting: state.followGroups.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getFollowGroup: (id) => dispatch(FollowGroupActions.followGroupRequest(id)),
    getAllFollowGroups: (options) => dispatch(FollowGroupActions.followGroupAllRequest(options)),
    deleteFollowGroup: (id) => dispatch(FollowGroupActions.followGroupDeleteRequest(id)),
    resetFollowGroups: () => dispatch(FollowGroupActions.followGroupReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowGroupDeleteModal);
