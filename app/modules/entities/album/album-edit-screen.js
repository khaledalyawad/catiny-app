import React, {createRef} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';

import AlbumActions from './album.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import ImageActions from '../image/image.reducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import {useDidUpdateEffect} from '../../../shared/util/use-did-update-effect';
import styles from './album-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
  name: Yup.string().required(),
});

function AlbumEditScreen(props)
{
  const {
    getAlbum,
    updateAlbum,
    route,
    album,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllBaseInfos,
    baseInfoList,
    getAllImages,
    imageList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() =>
  {
    if (!isNewEntity)
    {
      getAlbum(route.params.entityId);
    }
    else
    {
      reset();
    }
  }, [isNewEntity, getAlbum, route, reset]);

  React.useEffect(() =>
  {
    if (isNewEntity)
    {
      setFormValue(entityToFormValue({}));
    }
    else if (!fetching)
    {
      setFormValue(entityToFormValue(album));
    }
  }, [album, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() =>
  {
    getAllBaseInfos();
    getAllImages();
  }, [getAllBaseInfos, getAllImages]);

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
        isNewEntity || !navigation.canGoBack() ? navigation.replace('AlbumDetail', {entityId: album?.id}) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateAlbum(formValueToEntity(data));

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
  const noteRef = createRef();
  const avatarRef = createRef();
  const infoRef = createRef();
  const imagesRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID='albumEditScrollView'
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
              onSubmitEditing={() => noteRef.current?.focus()}
            />
            <FormField
              name='note'
              ref={noteRef}
              label='Note'
              placeholder='Enter Note'
              testID='noteInput'
              inputType='text'
              autoCapitalize='none'
              onSubmitEditing={() => avatarRef.current?.focus()}
            />
            <FormField name='avatar' ref={avatarRef} label='Avatar' placeholder='Enter Avatar' testID='avatarInput' />
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
              name='images'
              inputType='select-multiple'
              ref={imagesRef}
              listItems={imageList}
              listItemLabelField='id'
              label='Image'
              placeholder='Select Image'
              testID='imageSelectInput'
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
    note: value.note ?? null,
    avatar: value.avatar ?? null,
    info: value.info && value.info.id ? value.info.id : null,
    images: value.images?.map((i) => i.id),
  };
};
const formValueToEntity = (value) =>
{
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    name: value.name ?? null,
    note: value.note ?? null,
    avatar: value.avatar ?? null,
  };
  entity.info = value.info ? {id: value.info} : null;
  entity.images = value.images.map((id) => ({id}));
  return entity;
};

const mapStateToProps = (state) =>
{
  return {
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    imageList: state.images.imageList ?? [],
    album: state.albums.album,
    fetching: state.albums.fetchingOne,
    updating: state.albums.updating,
    updateSuccess: state.albums.updateSuccess,
    errorUpdating: state.albums.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getAllImages: (options) => dispatch(ImageActions.imageAllRequest(options)),
    getAlbum: (id) => dispatch(AlbumActions.albumRequest(id)),
    getAllAlbums: (options) => dispatch(AlbumActions.albumAllRequest(options)),
    updateAlbum: (album) => dispatch(AlbumActions.albumUpdateRequest(album)),
    reset: () => dispatch(AlbumActions.albumReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumEditScreen);
