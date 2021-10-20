import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import MessageGroupActions from './message-group.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './message-group-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
});

function MessageGroupEditScreen(props) {
  const {
    getMessageGroup,
    updateMessageGroup,
    route,
    messageGroup,
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

  React.useEffect(() => {
    if (!isNewEntity) {
      getMessageGroup(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getMessageGroup, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(messageGroup));
    }
  }, [messageGroup, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllBaseInfos();
  }, [getAllBaseInfos]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack()
          ? navigation.replace('MessageGroupDetail', { entityId: messageGroup?.id })
          : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateMessageGroup(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const uuidRef = createRef();
  const groupNameRef = createRef();
  const avatarRef = createRef();
  const addByRef = createRef();
  const infoRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="messageGroupEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="uuid"
              ref={uuidRef}
              label="Uuid"
              placeholder="Enter Uuid"
              testID="uuidInput"
              onSubmitEditing={() => groupNameRef.current?.focus()}
            />
            <FormField
              name="groupName"
              ref={groupNameRef}
              label="Group Name"
              placeholder="Enter Group Name"
              testID="groupNameInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => avatarRef.current?.focus()}
            />
            <FormField
              name="avatar"
              ref={avatarRef}
              label="Avatar"
              placeholder="Enter Avatar"
              testID="avatarInput"
              onSubmitEditing={() => addByRef.current?.focus()}
            />
            <FormField
              name="addBy"
              ref={addByRef}
              label="Add By"
              placeholder="Enter Add By"
              testID="addByInput"
              inputType="text"
              autoCapitalize="none"
            />
            <FormField
              name="info"
              inputType="select-one"
              ref={infoRef}
              listItems={baseInfoList}
              listItemLabelField="id"
              label="Info"
              placeholder="Select Info"
              testID="baseInfoSelectInput"
            />

            <FormButton title={'Save'} testID={'submitButton'} />
          </Form>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = (value) => {
  if (!value) {
    return {};
  }
  return {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    groupName: value.groupName ?? null,
    avatar: value.avatar ?? null,
    addBy: value.addBy ?? null,
    info: value.info && value.info.id ? value.info.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    groupName: value.groupName ?? null,
    avatar: value.avatar ?? null,
    addBy: value.addBy ?? null,
  };
  entity.info = value.info ? { id: value.info } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    messageGroup: state.messageGroups.messageGroup,
    fetching: state.messageGroups.fetchingOne,
    updating: state.messageGroups.updating,
    updateSuccess: state.messageGroups.updateSuccess,
    errorUpdating: state.messageGroups.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getMessageGroup: (id) => dispatch(MessageGroupActions.messageGroupRequest(id)),
    getAllMessageGroups: (options) => dispatch(MessageGroupActions.messageGroupAllRequest(options)),
    updateMessageGroup: (messageGroup) => dispatch(MessageGroupActions.messageGroupUpdateRequest(messageGroup)),
    reset: () => dispatch(MessageGroupActions.messageGroupReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageGroupEditScreen);
