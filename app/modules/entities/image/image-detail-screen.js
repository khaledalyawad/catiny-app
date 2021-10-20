import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import ImageActions from './image.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import ImageDeleteModal from './image-delete-modal';
import styles from './image-styles';

function ImageDetailScreen(props) {
  const { route, getImage, navigation, image, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = image?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Image');
      } else {
        setDeleteModalVisible(false);
        getImage(routeEntityId);
      }
    }, [routeEntityId, getImage, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Image.</Text>
      </View>
    );
  }
  if (!entityId || fetching || !correctEntityLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="imageDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{image.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID="uuid">{image.uuid}</Text>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Text testID="name">{image.name}</Text>
      {/* Width Field */}
      <Text style={styles.label}>Width:</Text>
      <Text testID="width">{image.width}</Text>
      {/* Height Field */}
      <Text style={styles.label}>Height:</Text>
      <Text testID="height">{image.height}</Text>
      {/* Quality Field */}
      <Text style={styles.label}>Quality:</Text>
      <Text testID="quality">{image.quality}</Text>
      {/* PixelSize Field */}
      <Text style={styles.label}>PixelSize:</Text>
      <Text testID="pixelSize">{image.pixelSize}</Text>
      {/* PriorityIndex Field */}
      <Text style={styles.label}>PriorityIndex:</Text>
      <Text testID="priorityIndex">{image.priorityIndex}</Text>
      {/* DataSize Field */}
      <Text style={styles.label}>DataSize:</Text>
      <Text testID="dataSize">{image.dataSize}</Text>
      <Text style={styles.label}>File Info:</Text>
      <Text testID="fileInfo">{String(image.fileInfo ? image.fileInfo.id : '')}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID="info">{String(image.info ? image.info.id : '')}</Text>
      <Text style={styles.label}>Original:</Text>
      <Text testID="original">{String(image.original ? image.original.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('ImageEdit', { entityId })}
          accessibilityLabel={'Image Edit Button'}
          testID="imageEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Image Delete Button'}
          testID="imageDeleteButton"
        />
        {deleteModalVisible && (
          <ImageDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={image}
            testID="imageDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    image: state.images.image,
    error: state.images.errorOne,
    fetching: state.images.fetchingOne,
    deleting: state.images.deleting,
    errorDeleting: state.images.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getImage: (id) => dispatch(ImageActions.imageRequest(id)),
    getAllImages: (options) => dispatch(ImageActions.imageAllRequest(options)),
    deleteImage: (id) => dispatch(ImageActions.imageDeleteRequest(id)),
    resetImages: () => dispatch(ImageActions.imageReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetailScreen);
