import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import TodoListActions from './todo-list.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import TodoListDeleteModal from './todo-list-delete-modal';
import styles from './todo-list-styles';

function TodoListDetailScreen(props) {
  const { route, getTodoList, navigation, todoList, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = todoList?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('TodoList');
      } else {
        setDeleteModalVisible(false);
        getTodoList(routeEntityId);
      }
    }, [routeEntityId, getTodoList, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the TodoList.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="todoListDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{todoList.id}</Text>
      {/* Uuid Field */}
      <Text style={styles.label}>Uuid:</Text>
      <Text testID="uuid">{todoList.uuid}</Text>
      {/* Title Field */}
      <Text style={styles.label}>Title:</Text>
      <Text testID="title">{todoList.title}</Text>
      {/* Content Field */}
      <Text style={styles.label}>Content:</Text>
      <Text testID="content">{todoList.content}</Text>
      <Text style={styles.label}>Info:</Text>
      <Text testID="info">{String(todoList.info ? todoList.info.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('TodoListEdit', { entityId })}
          accessibilityLabel={'TodoList Edit Button'}
          testID="todoListEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'TodoList Delete Button'}
          testID="todoListDeleteButton"
        />
        {deleteModalVisible && (
          <TodoListDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={todoList}
            testID="todoListDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    todoList: state.todoLists.todoList,
    error: state.todoLists.errorOne,
    fetching: state.todoLists.fetchingOne,
    deleting: state.todoLists.deleting,
    errorDeleting: state.todoLists.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTodoList: (id) => dispatch(TodoListActions.todoListRequest(id)),
    getAllTodoLists: (options) => dispatch(TodoListActions.todoListAllRequest(options)),
    deleteTodoList: (id) => dispatch(TodoListActions.todoListDeleteRequest(id)),
    resetTodoLists: () => dispatch(TodoListActions.todoListReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListDetailScreen);
