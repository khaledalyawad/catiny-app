import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import AccountStatusActions from './account-status.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './account-status-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
});

const StatusName = [
  {
    label: 'ONLINE',
    value: 'ONLINE',
  },
  {
    label: 'OFFLINE',
    value: 'OFFLINE',
  },
  {
    label: 'BUSY',
    value: 'BUSY',
  },
  {
    label: 'TEMPORARILY_ABSENT',
    value: 'TEMPORARILY_ABSENT',
  },
];

function AccountStatusEditScreen(props) {
  const {
    getAccountStatus,
    updateAccountStatus,
    route,
    accountStatus,
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
      getAccountStatus(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getAccountStatus, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(accountStatus));
    }
  }, [accountStatus, fetching, isNewEntity]);

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
          ? navigation.replace('AccountStatusDetail', { entityId: accountStatus?.id })
          : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateAccountStatus(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const uuidRef = createRef();
  const accountStatusRef = createRef();
  const lastVisitedRef = createRef();
  const statusCommentRef = createRef();
  const infoRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="accountStatusEditScrollView"
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
              onSubmitEditing={() => accountStatusRef.current?.focus()}
            />
            <FormField
              name="accountStatus"
              ref={accountStatusRef}
              label="Account Status"
              placeholder="Enter Account Status"
              testID="accountStatusInput"
              inputType="select-one"
              listItems={StatusName}
              onSubmitEditing={() => lastVisitedRef.current?.focus()}
            />
            <FormField
              name="lastVisited"
              ref={lastVisitedRef}
              label="Last Visited"
              placeholder="Enter Last Visited"
              testID="lastVisitedInput"
              inputType="datetime"
              onSubmitEditing={() => statusCommentRef.current?.focus()}
            />
            <FormField
              name="statusComment"
              ref={statusCommentRef}
              label="Status Comment"
              placeholder="Enter Status Comment"
              testID="statusCommentInput"
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
    accountStatus: value.accountStatus ?? null,
    lastVisited: value.lastVisited ?? null,
    statusComment: value.statusComment ?? null,
    info: value.info && value.info.id ? value.info.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    accountStatus: value.accountStatus ?? null,
    lastVisited: value.lastVisited ?? null,
    statusComment: value.statusComment ?? null,
  };
  entity.info = value.info ? { id: value.info } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    accountStatus: state.accountStatuses.accountStatus,
    fetching: state.accountStatuses.fetchingOne,
    updating: state.accountStatuses.updating,
    updateSuccess: state.accountStatuses.updateSuccess,
    errorUpdating: state.accountStatuses.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getAccountStatus: (id) => dispatch(AccountStatusActions.accountStatusRequest(id)),
    getAllAccountStatuses: (options) => dispatch(AccountStatusActions.accountStatusAllRequest(options)),
    updateAccountStatus: (accountStatus) => dispatch(AccountStatusActions.accountStatusUpdateRequest(accountStatus)),
    reset: () => dispatch(AccountStatusActions.accountStatusReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountStatusEditScreen);
