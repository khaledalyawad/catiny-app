import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import HistoryUpdateActions from './history-update.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './history-update-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
});

function HistoryUpdateEditScreen(props) {
  const {
    getHistoryUpdate,
    updateHistoryUpdate,
    route,
    historyUpdate,
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
      getHistoryUpdate(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getHistoryUpdate, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(historyUpdate));
    }
  }, [historyUpdate, fetching, isNewEntity]);

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
          ? navigation.replace('HistoryUpdateDetail', { entityId: historyUpdate?.id })
          : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateHistoryUpdate(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const uuidRef = createRef();
  const versionRef = createRef();
  const contentRef = createRef();
  const baseInfoRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="historyUpdateEditScrollView"
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
              onSubmitEditing={() => versionRef.current?.focus()}
            />
            <FormField
              name="version"
              ref={versionRef}
              label="Version"
              placeholder="Enter Version"
              testID="versionInput"
              inputType="number"
              onSubmitEditing={() => contentRef.current?.focus()}
            />
            <FormField name="content" ref={contentRef} label="Content" placeholder="Enter Content" testID="contentInput" />
            <FormField
              name="baseInfo"
              inputType="select-one"
              ref={baseInfoRef}
              listItems={baseInfoList}
              listItemLabelField="id"
              label="Base Info"
              placeholder="Select Base Info"
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
    version: value.version ?? null,
    content: value.content ?? null,
    baseInfo: value.baseInfo && value.baseInfo.id ? value.baseInfo.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    version: value.version ?? null,
    content: value.content ?? null,
  };
  entity.baseInfo = value.baseInfo ? { id: value.baseInfo } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    historyUpdate: state.historyUpdates.historyUpdate,
    fetching: state.historyUpdates.fetchingOne,
    updating: state.historyUpdates.updating,
    updateSuccess: state.historyUpdates.updateSuccess,
    errorUpdating: state.historyUpdates.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getHistoryUpdate: (id) => dispatch(HistoryUpdateActions.historyUpdateRequest(id)),
    getAllHistoryUpdates: (options) => dispatch(HistoryUpdateActions.historyUpdateAllRequest(options)),
    updateHistoryUpdate: (historyUpdate) => dispatch(HistoryUpdateActions.historyUpdateUpdateRequest(historyUpdate)),
    reset: () => dispatch(HistoryUpdateActions.historyUpdateReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryUpdateEditScreen);
