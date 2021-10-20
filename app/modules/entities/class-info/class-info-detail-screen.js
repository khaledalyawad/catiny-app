import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import ClassInfoActions from './class-info.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import ClassInfoDeleteModal from './class-info-delete-modal';
import styles from './class-info-styles';

function ClassInfoDetailScreen(props) {
  const { route, getClassInfo, navigation, classInfo, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = classInfo?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('ClassInfo');
      } else {
        setDeleteModalVisible(false);
        getClassInfo(routeEntityId);
      }
    }, [routeEntityId, getClassInfo, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the ClassInfo.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="classInfoDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{classInfo.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID="uuid">{classInfo.uuid}</Text>
      {/* NamePackage Field */}
      <Text style={styles.label}>NamePackage:</Text>
      <Text testID="namePackage">{classInfo.namePackage}</Text>
      {/* FullName Field */}
      <Text style={styles.label}>FullName:</Text>
      <Text testID="fullName">{classInfo.fullName}</Text>
      {/* ClassName Field */}
      <Text style={styles.label}>ClassName:</Text>
      <Text testID="className">{classInfo.className}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('ClassInfoEdit', { entityId })}
          accessibilityLabel={'ClassInfo Edit Button'}
          testID="classInfoEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'ClassInfo Delete Button'}
          testID="classInfoDeleteButton"
        />
        {deleteModalVisible && (
          <ClassInfoDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={classInfo}
            testID="classInfoDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    classInfo: state.classInfos.classInfo,
    error: state.classInfos.errorOne,
    fetching: state.classInfos.fetchingOne,
    deleting: state.classInfos.deleting,
    errorDeleting: state.classInfos.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getClassInfo: (id) => dispatch(ClassInfoActions.classInfoRequest(id)),
    getAllClassInfos: (options) => dispatch(ClassInfoActions.classInfoAllRequest(options)),
    deleteClassInfo: (id) => dispatch(ClassInfoActions.classInfoDeleteRequest(id)),
    resetClassInfos: () => dispatch(ClassInfoActions.classInfoReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassInfoDetailScreen);
