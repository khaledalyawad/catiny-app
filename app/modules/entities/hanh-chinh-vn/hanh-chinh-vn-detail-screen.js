import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import HanhChinhVNActions from './hanh-chinh-vn.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import HanhChinhVNDeleteModal from './hanh-chinh-vn-delete-modal';
import styles from './hanh-chinh-vn-styles';

function HanhChinhVNDetailScreen(props) {
  const { route, getHanhChinhVN, navigation, hanhChinhVN, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = hanhChinhVN?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('HanhChinhVN');
      } else {
        setDeleteModalVisible(false);
        getHanhChinhVN(routeEntityId);
      }
    }, [routeEntityId, getHanhChinhVN, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the HanhChinhVN.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="hanhChinhVNDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{hanhChinhVN.id}</Text>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Text testID="name">{hanhChinhVN.name}</Text>
      {/* Slug Field */}
      <Text style={styles.label}>Slug:</Text>
      <Text testID="slug">{hanhChinhVN.slug}</Text>
      {/* Type Field */}
      <Text style={styles.label}>Type:</Text>
      <Text testID="type">{hanhChinhVN.type}</Text>
      {/* NameWithType Field */}
      <Text style={styles.label}>NameWithType:</Text>
      <Text testID="nameWithType">{hanhChinhVN.nameWithType}</Text>
      {/* Code Field */}
      <Text style={styles.label}>Code:</Text>
      <Text testID="code">{hanhChinhVN.code}</Text>
      {/* ParentCode Field */}
      <Text style={styles.label}>ParentCode:</Text>
      <Text testID="parentCode">{hanhChinhVN.parentCode}</Text>
      {/* Path Field */}
      <Text style={styles.label}>Path:</Text>
      <Text testID="path">{hanhChinhVN.path}</Text>
      {/* PathWithType Field */}
      <Text style={styles.label}>PathWithType:</Text>
      <Text testID="pathWithType">{hanhChinhVN.pathWithType}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('HanhChinhVNEdit', { entityId })}
          accessibilityLabel={'HanhChinhVN Edit Button'}
          testID="hanhChinhVNEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'HanhChinhVN Delete Button'}
          testID="hanhChinhVNDeleteButton"
        />
        {deleteModalVisible && (
          <HanhChinhVNDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={hanhChinhVN}
            testID="hanhChinhVNDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    hanhChinhVN: state.hanhChinhVNS.hanhChinhVN,
    error: state.hanhChinhVNS.errorOne,
    fetching: state.hanhChinhVNS.fetchingOne,
    deleting: state.hanhChinhVNS.deleting,
    errorDeleting: state.hanhChinhVNS.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHanhChinhVN: (id) => dispatch(HanhChinhVNActions.hanhChinhVNRequest(id)),
    getAllHanhChinhVNS: (options) => dispatch(HanhChinhVNActions.hanhChinhVNAllRequest(options)),
    deleteHanhChinhVN: (id) => dispatch(HanhChinhVNActions.hanhChinhVNDeleteRequest(id)),
    resetHanhChinhVNS: () => dispatch(HanhChinhVNActions.hanhChinhVNReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HanhChinhVNDetailScreen);
