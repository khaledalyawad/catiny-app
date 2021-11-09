import React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';

import ImageActions from './image.reducer';

import styles from './image-styles';

function ImageDeleteModal(props)
{
  const {visible, setVisible, entity, navigation, testID} = props;

  const deleteEntity = () =>
  {
    props.deleteImage(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Image');
  };
  return (
    <Modal animationType='slide' transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Image {entity.id}?</Text>
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
    image: state.images.image,
    fetching: state.images.fetchingOne,
    deleting: state.images.deleting,
    errorDeleting: state.images.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getImage: (id) => dispatch(ImageActions.imageRequest(id)),
    getAllImages: (options) => dispatch(ImageActions.imageAllRequest(options)),
    deleteImage: (id) => dispatch(ImageActions.imageDeleteRequest(id)),
    resetImages: () => dispatch(ImageActions.imageReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageDeleteModal);
