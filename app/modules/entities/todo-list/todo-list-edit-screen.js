import React, {createRef} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';

import TodoListActions from './todo-list.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import {useDidUpdateEffect} from '../../../shared/util/use-did-update-effect';
import styles from './todo-list-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
});

function TodoListEditScreen(props)
{
  const {
    getTodoList,
    updateTodoList,
    route,
    todoList,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllBaseInfos,
    baseInfoList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() =>
  {
    if (!isNewEntity)
    {
      getTodoList(route.params.entityId);
    }
    else
    {
      reset();
    }
  }, [isNewEntity, getTodoList, route, reset]);

  React.useEffect(() =>
  {
    if (isNewEntity)
    {
      setFormValue(entityToFormValue({}));
    }
    else if (!fetching)
    {
      setFormValue(entityToFormValue(todoList));
    }
  }, [todoList, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() =>
  {
    getAllBaseInfos();
  }, [getAllBaseInfos]);

  useDidUpdateEffect(() =>
  {
    if (updating === false)
    {
      if (errorUpdating)
      {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      }
      else if (updateSuccess)
      {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('TodoListDetail', {entityId: todoList?.id}) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateTodoList(formValueToEntity(data));

  if (fetching)
  {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  const formRef = createRef();
  const uuidRef = createRef();
  const titleRef = createRef();
  const contentRef = createRef();
  const infoRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID='todoListEditScrollView'
        keyboardShouldPersistTaps='handled'
        keyboardDismissMode='on-drag'
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name='uuid'
              ref={uuidRef}
              label='Uuid'
              placeholder='Enter Uuid'
              testID='uuidInput'
              onSubmitEditing={() => titleRef.current?.focus()}
            />
            <FormField
              name='title'
              ref={titleRef}
              label='Title'
              placeholder='Enter Title'
              testID='titleInput'
              inputType='text'
              autoCapitalize='none'
              onSubmitEditing={() => contentRef.current?.focus()}
            />
            <FormField name='content' ref={contentRef} label='Content' placeholder='Enter Content' testID='contentInput' />
            <FormField
              name='info'
              inputType='select-one'
              ref={infoRef}
              listItems={baseInfoList}
              listItemLabelField='id'
              label='Info'
              placeholder='Select Info'
              testID='baseInfoSelectInput'
            />

            <FormButton title={'Save'} testID={'submitButton'} />
          </Form>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = (value) =>
{
  if (!value)
  {
    return {};
  }
  return {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    title: value.title ?? null,
    content: value.content ?? null,
    info: value.info && value.info.id ? value.info.id : null,
  };
};
const formValueToEntity = (value) =>
{
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    title: value.title ?? null,
    content: value.content ?? null,
  };
  entity.info = value.info ? {id: value.info} : null;
  return entity;
};

const mapStateToProps = (state) =>
{
  return {
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    todoList: state.todoLists.todoList,
    fetching: state.todoLists.fetchingOne,
    updating: state.todoLists.updating,
    updateSuccess: state.todoLists.updateSuccess,
    errorUpdating: state.todoLists.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getTodoList: (id) => dispatch(TodoListActions.todoListRequest(id)),
    getAllTodoLists: (options) => dispatch(TodoListActions.todoListAllRequest(options)),
    updateTodoList: (todoList) => dispatch(TodoListActions.todoListUpdateRequest(todoList)),
    reset: () => dispatch(TodoListActions.todoListReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListEditScreen);
