import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import VideoLiveStreamBufferActions from './video-live-stream-buffer.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import VideoStreamActions from '../video-stream/video-stream.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './video-live-stream-buffer-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
});

function VideoLiveStreamBufferEditScreen(props) {
  const {
    getVideoLiveStreamBuffer,
    updateVideoLiveStreamBuffer,
    route,
    videoLiveStreamBuffer,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllBaseInfos,
    baseInfoList,
    getAllVideoStreams,
    videoStreamList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getVideoLiveStreamBuffer(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getVideoLiveStreamBuffer, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(videoLiveStreamBuffer));
    }
  }, [videoLiveStreamBuffer, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllBaseInfos();
    getAllVideoStreams();
  }, [getAllBaseInfos, getAllVideoStreams]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack()
          ? navigation.replace('VideoLiveStreamBufferDetail', { entityId: videoLiveStreamBuffer?.id })
          : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateVideoLiveStreamBuffer(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const uuidRef = createRef();
  const bufferDataRef = createRef();
  const bufferDataContentTypeRef = createRef();
  const bufferNumberRef = createRef();
  const pathRef = createRef();
  const infoRef = createRef();
  const videoStreamRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="videoLiveStreamBufferEditScrollView"
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
              onSubmitEditing={() => bufferDataRef.current?.focus()}
            />
            <FormField
              name="bufferData"
              ref={bufferDataRef}
              label="Buffer Data"
              placeholder="Enter Buffer Data"
              testID="bufferDataInput"
              onSubmitEditing={() => bufferDataContentTypeRef.current?.focus()}
            />
            <FormField
              name="bufferDataContentType"
              ref={bufferDataContentTypeRef}
              label="Buffer Data Content Type"
              placeholder="Enter Buffer Data Content Type"
              testID="bufferDataContentTypeInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => bufferNumberRef.current?.focus()}
            />
            <FormField
              name="bufferNumber"
              ref={bufferNumberRef}
              label="Buffer Number"
              placeholder="Enter Buffer Number"
              testID="bufferNumberInput"
              inputType="number"
              onSubmitEditing={() => pathRef.current?.focus()}
            />
            <FormField
              name="path"
              ref={pathRef}
              label="Path"
              placeholder="Enter Path"
              testID="pathInput"
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
              name="videoStream"
              inputType="select-one"
              ref={videoStreamRef}
              listItems={videoStreamList}
              listItemLabelField="id"
              label="Video Stream"
              placeholder="Select Video Stream"
              testID="videoStreamSelectInput"
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
    bufferData: value.bufferData ?? null,
    bufferDataContentType: value.bufferDataContentType ?? null,
    bufferNumber: value.bufferNumber ?? null,
    path: value.path ?? null,
    info: value.info && value.info.id ? value.info.id : null,
    videoStream: value.videoStream && value.videoStream.id ? value.videoStream.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    bufferData: value.bufferData ?? null,
    bufferDataContentType: value.bufferDataContentType ?? null,
    bufferNumber: value.bufferNumber ?? null,
    path: value.path ?? null,
  };
  entity.info = value.info ? { id: value.info } : null;
  entity.videoStream = value.videoStream ? { id: value.videoStream } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    videoStreamList: state.videoStreams.videoStreamList ?? [],
    videoLiveStreamBuffer: state.videoLiveStreamBuffers.videoLiveStreamBuffer,
    fetching: state.videoLiveStreamBuffers.fetchingOne,
    updating: state.videoLiveStreamBuffers.updating,
    updateSuccess: state.videoLiveStreamBuffers.updateSuccess,
    errorUpdating: state.videoLiveStreamBuffers.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getAllVideoStreams: (options) => dispatch(VideoStreamActions.videoStreamAllRequest(options)),
    getVideoLiveStreamBuffer: (id) => dispatch(VideoLiveStreamBufferActions.videoLiveStreamBufferRequest(id)),
    getAllVideoLiveStreamBuffers: (options) => dispatch(VideoLiveStreamBufferActions.videoLiveStreamBufferAllRequest(options)),
    updateVideoLiveStreamBuffer: (videoLiveStreamBuffer) =>
      dispatch(VideoLiveStreamBufferActions.videoLiveStreamBufferUpdateRequest(videoLiveStreamBuffer)),
    reset: () => dispatch(VideoLiveStreamBufferActions.videoLiveStreamBufferReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoLiveStreamBufferEditScreen);
