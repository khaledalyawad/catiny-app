import React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';

import PageProfileActions from './page-profile.reducer';

import styles from './page-profile-styles';

function PageProfileDeleteModal(props)
{
  const {visible, setVisible, entity, navigation, testID} = props;

  const deleteEntity = () =>
  {
    props.deletePageProfile(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('PageProfile');
  };
  return (
    <Modal animationType='slide' transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete PageProfile {entity.id}?</Text>
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
    pageProfile: state.pageProfiles.pageProfile,
    fetching: state.pageProfiles.fetchingOne,
    deleting: state.pageProfiles.deleting,
    errorDeleting: state.pageProfiles.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getPageProfile: (id) => dispatch(PageProfileActions.pageProfileRequest(id)),
    getAllPageProfiles: (options) => dispatch(PageProfileActions.pageProfileAllRequest(options)),
    deletePageProfile: (id) => dispatch(PageProfileActions.pageProfileDeleteRequest(id)),
    resetPageProfiles: () => dispatch(PageProfileActions.pageProfileReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageProfileDeleteModal);
