import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import DeviceStatusActions from './device-status.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import AccountStatusActions from '../account-status/account-status.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './device-status-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
});

const DeviceType = [
  {
    label: 'MOBILE',
    value: 'MOBILE',
  },
  {
    label: 'TABLE',
    value: 'TABLE',
  },
  {
    label: 'DESKTOP',
    value: 'DESKTOP',
  },
  {
    label: 'LAPTOP',
    value: 'LAPTOP',
  },
  {
    label: 'OTHER_DEVICE',
    value: 'OTHER_DEVICE',
  },
];
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

function DeviceStatusEditScreen(props) {
  const {
    getDeviceStatus,
    updateDeviceStatus,
    route,
    deviceStatus,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllBaseInfos,
    baseInfoList,
    getAllAccountStatuses,
    accountStatusList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getDeviceStatus(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getDeviceStatus, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(deviceStatus));
    }
  }, [deviceStatus, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllBaseInfos();
    getAllAccountStatuses();
  }, [getAllBaseInfos, getAllAccountStatuses]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack()
          ? navigation.replace('DeviceStatusDetail', { entityId: deviceStatus?.id })
          : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateDeviceStatus(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const uuidRef = createRef();
  const deviceNameRef = createRef();
  const deviceTypeRef = createRef();
  const deviceStatusRef = createRef();
  const lastVisitedRef = createRef();
  const statusCommentRef = createRef();
  const infoRef = createRef();
  const accountStatusRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="deviceStatusEditScrollView"
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
              onSubmitEditing={() => deviceNameRef.current?.focus()}
            />
            <FormField
              name="deviceName"
              ref={deviceNameRef}
              label="Device Name"
              placeholder="Enter Device Name"
              testID="deviceNameInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => deviceTypeRef.current?.focus()}
            />
            <FormField
              name="deviceType"
              ref={deviceTypeRef}
              label="Device Type"
              placeholder="Enter Device Type"
              testID="deviceTypeInput"
              inputType="select-one"
              listItems={DeviceType}
              onSubmitEditing={() => deviceStatusRef.current?.focus()}
            />
            <FormField
              name="deviceStatus"
              ref={deviceStatusRef}
              label="Device Status"
              placeholder="Enter Device Status"
              testID="deviceStatusInput"
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
            <FormField
              name="accountStatus"
              inputType="select-one"
              ref={accountStatusRef}
              listItems={accountStatusList}
              listItemLabelField="id"
              label="Account Status"
              placeholder="Select Account Status"
              testID="accountStatusSelectInput"
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
    deviceName: value.deviceName ?? null,
    deviceType: value.deviceType ?? null,
    deviceStatus: value.deviceStatus ?? null,
    lastVisited: value.lastVisited ?? null,
    statusComment: value.statusComment ?? null,
    info: value.info && value.info.id ? value.info.id : null,
    accountStatus: value.accountStatus && value.accountStatus.id ? value.accountStatus.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    deviceName: value.deviceName ?? null,
    deviceType: value.deviceType ?? null,
    deviceStatus: value.deviceStatus ?? null,
    lastVisited: value.lastVisited ?? null,
    statusComment: value.statusComment ?? null,
  };
  entity.info = value.info ? { id: value.info } : null;
  entity.accountStatus = value.accountStatus ? { id: value.accountStatus } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    accountStatusList: state.accountStatuses.accountStatusList ?? [],
    deviceStatus: state.deviceStatuses.deviceStatus,
    fetching: state.deviceStatuses.fetchingOne,
    updating: state.deviceStatuses.updating,
    updateSuccess: state.deviceStatuses.updateSuccess,
    errorUpdating: state.deviceStatuses.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getAllAccountStatuses: (options) => dispatch(AccountStatusActions.accountStatusAllRequest(options)),
    getDeviceStatus: (id) => dispatch(DeviceStatusActions.deviceStatusRequest(id)),
    getAllDeviceStatuses: (options) => dispatch(DeviceStatusActions.deviceStatusAllRequest(options)),
    updateDeviceStatus: (deviceStatus) => dispatch(DeviceStatusActions.deviceStatusUpdateRequest(deviceStatus)),
    reset: () => dispatch(DeviceStatusActions.deviceStatusReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceStatusEditScreen);
