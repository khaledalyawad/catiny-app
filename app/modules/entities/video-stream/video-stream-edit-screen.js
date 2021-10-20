import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import VideoStreamActions from './video-stream.reducer';
import VideoActions from '../video/video.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './video-stream-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
});

function VideoStreamEditScreen(props) {
  const {
    getVideoStream,
    updateVideoStream,
    route,
    videoStream,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllVideos,
    videoList,
    getAllBaseInfos,
    baseInfoList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getVideoStream(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getVideoStream, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(videoStream));
    }
  }, [videoStream, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllVideos();
    getAllBaseInfos();
  }, [getAllVideos, getAllBaseInfos]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('VideoStreamDetail', { entityId: videoStream?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateVideoStream(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const uuidRef = createRef();
  const isLivestreamingRef = createRef();
  const videoRef = createRef();
  const infoRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="videoStreamEditScrollView"
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
              onSubmitEditing={() => isLivestreamingRef.current?.focus()}
            />
            <FormField
              name="isLivestreaming"
              ref={isLivestreamingRef}
              label="Is Livestreaming"
              placeholder="Enter Is Livestreaming"
              testID="isLivestreamingInput"
              inputType="boolean"
            />
            <FormField
              name="video"
              inputType="select-one"
              ref={videoRef}
              listItems={videoList}
              listItemLabelField="id"
              label="Video"
              placeholder="Select Video"
              testID="videoSelectInput"
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
    isLivestreaming: value.isLivestreaming ?? null,
    video: value.video && value.video.id ? value.video.id : null,
    info: value.info && value.info.id ? value.info.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    isLivestreaming: value.isLivestreaming === null ? false : Boolean(value.isLivestreaming),
  };
  entity.video = value.video ? { id: value.video } : null;
  entity.info = value.info ? { id: value.info } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    videoList: state.videos.videoList ?? [],
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    videoStream: state.videoStreams.videoStream,
    fetching: state.videoStreams.fetchingOne,
    updating: state.videoStreams.updating,
    updateSuccess: state.videoStreams.updateSuccess,
    errorUpdating: state.videoStreams.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllVideos: (options) => dispatch(VideoActions.videoAllRequest(options)),
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getVideoStream: (id) => dispatch(VideoStreamActions.videoStreamRequest(id)),
    getAllVideoStreams: (options) => dispatch(VideoStreamActions.videoStreamAllRequest(options)),
    updateVideoStream: (videoStream) => dispatch(VideoStreamActions.videoStreamUpdateRequest(videoStream)),
    reset: () => dispatch(VideoStreamActions.videoStreamReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoStreamEditScreen);
