import React, {createRef} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';

import VideoActions from './video.reducer';
import FileInfoActions from '../file-info/file-info.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import {useDidUpdateEffect} from '../../../shared/util/use-did-update-effect';
import styles from './video-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
  qualityImage: Yup.number().min(0).max(1),
  qualityAudio: Yup.number().min(0).max(1),
  quality: Yup.number().min(0).max(1),
});

function VideoEditScreen(props)
{
  const {
    getVideo,
    updateVideo,
    route,
    video,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllFileInfos,
    fileInfoList,
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
      getVideo(route.params.entityId);
    }
    else
    {
      reset();
    }
  }, [isNewEntity, getVideo, route, reset]);

  React.useEffect(() =>
  {
    if (isNewEntity)
    {
      setFormValue(entityToFormValue({}));
    }
    else if (!fetching)
    {
      setFormValue(entityToFormValue(video));
    }
  }, [video, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() =>
  {
    getAllFileInfos();
    getAllBaseInfos();
  }, [getAllFileInfos, getAllBaseInfos]);

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
        isNewEntity || !navigation.canGoBack() ? navigation.replace('VideoDetail', {entityId: video?.id}) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateVideo(formValueToEntity(data));

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
  const nameRef = createRef();
  const widthRef = createRef();
  const heightRef = createRef();
  const qualityImageRef = createRef();
  const qualityAudioRef = createRef();
  const qualityRef = createRef();
  const pixelSizeRef = createRef();
  const priorityIndexRef = createRef();
  const dataSizeRef = createRef();
  const fileInfoRef = createRef();
  const infoRef = createRef();
  const originalRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID='videoEditScrollView'
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
              onSubmitEditing={() => nameRef.current?.focus()}
            />
            <FormField
              name='name'
              ref={nameRef}
              label='Name'
              placeholder='Enter Name'
              testID='nameInput'
              inputType='text'
              autoCapitalize='none'
              onSubmitEditing={() => widthRef.current?.focus()}
            />
            <FormField
              name='width'
              ref={widthRef}
              label='Width'
              placeholder='Enter Width'
              testID='widthInput'
              inputType='number'
              onSubmitEditing={() => heightRef.current?.focus()}
            />
            <FormField
              name='height'
              ref={heightRef}
              label='Height'
              placeholder='Enter Height'
              testID='heightInput'
              inputType='number'
              onSubmitEditing={() => qualityImageRef.current?.focus()}
            />
            <FormField
              name='qualityImage'
              ref={qualityImageRef}
              label='Quality Image'
              placeholder='Enter Quality Image'
              testID='qualityImageInput'
              inputType='number'
              onSubmitEditing={() => qualityAudioRef.current?.focus()}
            />
            <FormField
              name='qualityAudio'
              ref={qualityAudioRef}
              label='Quality Audio'
              placeholder='Enter Quality Audio'
              testID='qualityAudioInput'
              inputType='number'
              onSubmitEditing={() => qualityRef.current?.focus()}
            />
            <FormField
              name='quality'
              ref={qualityRef}
              label='Quality'
              placeholder='Enter Quality'
              testID='qualityInput'
              inputType='number'
              onSubmitEditing={() => pixelSizeRef.current?.focus()}
            />
            <FormField
              name='pixelSize'
              ref={pixelSizeRef}
              label='Pixel Size'
              placeholder='Enter Pixel Size'
              testID='pixelSizeInput'
              inputType='number'
              onSubmitEditing={() => priorityIndexRef.current?.focus()}
            />
            <FormField
              name='priorityIndex'
              ref={priorityIndexRef}
              label='Priority Index'
              placeholder='Enter Priority Index'
              testID='priorityIndexInput'
              inputType='number'
              onSubmitEditing={() => dataSizeRef.current?.focus()}
            />
            <FormField
              name='dataSize'
              ref={dataSizeRef}
              label='Data Size'
              placeholder='Enter Data Size'
              testID='dataSizeInput'
              inputType='number'
            />
            <FormField
              name='fileInfo'
              inputType='select-one'
              ref={fileInfoRef}
              listItems={fileInfoList}
              listItemLabelField='id'
              label='File Info'
              placeholder='Select File Info'
              testID='fileInfoSelectInput'
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
              name='original'
              inputType='select-one'
              ref={originalRef}
              listItems={videoList}
              listItemLabelField='id'
              label='Original'
              placeholder='Select Original'
              testID='videoSelectInput'
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
    name: value.name ?? null,
    width: value.width ?? null,
    height: value.height ?? null,
    qualityImage: value.qualityImage ?? null,
    qualityAudio: value.qualityAudio ?? null,
    quality: value.quality ?? null,
    pixelSize: value.pixelSize ?? null,
    priorityIndex: value.priorityIndex ?? null,
    dataSize: value.dataSize ?? null,
    fileInfo: value.fileInfo && value.fileInfo.id ? value.fileInfo.id : null,
    info: value.info && value.info.id ? value.info.id : null,
    original: value.original && value.original.id ? value.original.id : null,
  };
};
const formValueToEntity = (value) =>
{
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    name: value.name ?? null,
    width: value.width ?? null,
    height: value.height ?? null,
    qualityImage: value.qualityImage ?? null,
    qualityAudio: value.qualityAudio ?? null,
    quality: value.quality ?? null,
    pixelSize: value.pixelSize ?? null,
    priorityIndex: value.priorityIndex ?? null,
    dataSize: value.dataSize ?? null,
  };
  entity.fileInfo = value.fileInfo ? {id: value.fileInfo} : null;
  entity.info = value.info ? {id: value.info} : null;
  entity.original = value.original ? {id: value.original} : null;
  return entity;
};

const mapStateToProps = (state) =>
{
  return {
    fileInfoList: state.fileInfos.fileInfoList ?? [],
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    video: state.videos.video,
    fetching: state.videos.fetchingOne,
    updating: state.videos.updating,
    updateSuccess: state.videos.updateSuccess,
    errorUpdating: state.videos.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getAllFileInfos: (options) => dispatch(FileInfoActions.fileInfoAllRequest(options)),
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getVideo: (id) => dispatch(VideoActions.videoRequest(id)),
    getAllVideos: (options) => dispatch(VideoActions.videoAllRequest(options)),
    updateVideo: (video) => dispatch(VideoActions.videoUpdateRequest(video)),
    reset: () => dispatch(VideoActions.videoReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoEditScreen);
