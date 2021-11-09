import React, {createRef} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';

import MessageContentActions from './message-content.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import MessageGroupActions from '../message-group/message-group.reducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import {useDidUpdateEffect} from '../../../shared/util/use-did-update-effect';
import styles from './message-content-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
});

function MessageContentEditScreen(props)
{
  const {
    getMessageContent,
    updateMessageContent,
    route,
    messageContent,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllBaseInfos,
    baseInfoList,
    getAllMessageGroups,
    messageGroupList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() =>
  {
    if (!isNewEntity)
    {
      getMessageContent(route.params.entityId);
    }
    else
    {
      reset();
    }
  }, [isNewEntity, getMessageContent, route, reset]);

  React.useEffect(() =>
  {
    if (isNewEntity)
    {
      setFormValue(entityToFormValue({}));
    }
    else if (!fetching)
    {
      setFormValue(entityToFormValue(messageContent));
    }
  }, [messageContent, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() =>
  {
    getAllBaseInfos();
    getAllMessageGroups();
  }, [getAllBaseInfos, getAllMessageGroups]);

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
        isNewEntity || !navigation.canGoBack()
          ? navigation.replace('MessageContentDetail', {entityId: messageContent?.id})
          : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateMessageContent(formValueToEntity(data));

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
  const senderNameRef = createRef();
  const attachRef = createRef();
  const contentRef = createRef();
  const statusRef = createRef();
  const searchFieldRef = createRef();
  const infoRef = createRef();
  const groupRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID='messageContentEditScrollView'
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
              onSubmitEditing={() => senderNameRef.current?.focus()}
            />
            <FormField
              name='senderName'
              ref={senderNameRef}
              label='Sender Name'
              placeholder='Enter Sender Name'
              testID='senderNameInput'
              inputType='text'
              autoCapitalize='none'
              onSubmitEditing={() => attachRef.current?.focus()}
            />
            <FormField
              name='attach'
              ref={attachRef}
              label='Attach'
              placeholder='Enter Attach'
              testID='attachInput'
              onSubmitEditing={() => contentRef.current?.focus()}
            />
            <FormField
              name='content'
              ref={contentRef}
              label='Content'
              placeholder='Enter Content'
              testID='contentInput'
              onSubmitEditing={() => statusRef.current?.focus()}
            />
            <FormField
              name='status'
              ref={statusRef}
              label='Status'
              placeholder='Enter Status'
              testID='statusInput'
              onSubmitEditing={() => searchFieldRef.current?.focus()}
            />
            <FormField
              name='searchField'
              ref={searchFieldRef}
              label='Search Field'
              placeholder='Enter Search Field'
              testID='searchFieldInput'
            />
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
            <FormField
              name='group'
              inputType='select-one'
              ref={groupRef}
              listItems={messageGroupList}
              listItemLabelField='id'
              label='Group'
              placeholder='Select Group'
              testID='messageGroupSelectInput'
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
    senderName: value.senderName ?? null,
    attach: value.attach ?? null,
    content: value.content ?? null,
    status: value.status ?? null,
    searchField: value.searchField ?? null,
    info: value.info && value.info.id ? value.info.id : null,
    group: value.group && value.group.id ? value.group.id : null,
  };
};
const formValueToEntity = (value) =>
{
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    senderName: value.senderName ?? null,
    attach: value.attach ?? null,
    content: value.content ?? null,
    status: value.status ?? null,
    searchField: value.searchField ?? null,
  };
  entity.info = value.info ? {id: value.info} : null;
  entity.group = value.group ? {id: value.group} : null;
  return entity;
};

const mapStateToProps = (state) =>
{
  return {
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    messageGroupList: state.messageGroups.messageGroupList ?? [],
    messageContent: state.messageContents.messageContent,
    fetching: state.messageContents.fetchingOne,
    updating: state.messageContents.updating,
    updateSuccess: state.messageContents.updateSuccess,
    errorUpdating: state.messageContents.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getAllMessageGroups: (options) => dispatch(MessageGroupActions.messageGroupAllRequest(options)),
    getMessageContent: (id) => dispatch(MessageContentActions.messageContentRequest(id)),
    getAllMessageContents: (options) => dispatch(MessageContentActions.messageContentAllRequest(options)),
    updateMessageContent: (messageContent) => dispatch(MessageContentActions.messageContentUpdateRequest(messageContent)),
    reset: () => dispatch(MessageContentActions.messageContentReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageContentEditScreen);
