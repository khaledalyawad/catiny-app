import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import TodoListActions from './todo-list.reducer';

import styles from './todo-list-styles';

function TodoListDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteTodoList(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('TodoList');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete TodoList {entity.id}?</Text>
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
    todoList: state.todoLists.todoList,
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

export default connect(mapStateToProps, mapDispatchToProps)(TodoListDeleteModal);
