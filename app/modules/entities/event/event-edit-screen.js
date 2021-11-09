import React, {createRef} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';

import EventActions from './event.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import {useDidUpdateEffect} from '../../../shared/util/use-did-update-effect';
import styles from './event-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
});

const EventType = [
  {
    label: 'DAY',
    value: 'DAY',
  },
  {
    label: 'MONTH',
    value: 'MONTH',
  },
  {
    label: 'YEAR',
    value: 'YEAR',
  },
  {
    label: 'ONLY_ONE',
    value: 'ONLY_ONE',
  },
];

function EventEditScreen(props)
{
  const {
    getEvent,
    updateEvent,
    route,
    event,
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
      getEvent(route.params.entityId);
    }
    else
    {
      reset();
    }
  }, [isNewEntity, getEvent, route, reset]);

  React.useEffect(() =>
  {
    if (isNewEntity)
    {
      setFormValue(entityToFormValue({}));
    }
    else if (!fetching)
    {
      setFormValue(entityToFormValue(event));
    }
  }, [event, fetching, isNewEntity]);

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
        isNewEntity || !navigation.canGoBack() ? navigation.replace('EventDetail', {entityId: event?.id}) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateEvent(formValueToEntity(data));

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
  const avatarRef = createRef();
  const contentRef = createRef();
  const typeRef = createRef();
  const descriptionRef = createRef();
  const startTimeRef = createRef();
  const endTimeRef = createRef();
  const tagLineRef = createRef();
  const imageCollectionRef = createRef();
  const videoCollectionRef = createRef();
  const infoRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID='eventEditScrollView'
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
              onSubmitEditing={() => avatarRef.current?.focus()}
            />
            <FormField
              name='avatar'
              ref={avatarRef}
              label='Avatar'
              placeholder='Enter Avatar'
              testID='avatarInput'
              onSubmitEditing={() => contentRef.current?.focus()}
            />
            <FormField
              name='content'
              ref={contentRef}
              label='Content'
              placeholder='Enter Content'
              testID='contentInput'
              onSubmitEditing={() => typeRef.current?.focus()}
            />
            <FormField
              name='type'
              ref={typeRef}
              label='Type'
              placeholder='Enter Type'
              testID='typeInput'
              inputType='select-one'
              listItems={EventType}
              onSubmitEditing={() => descriptionRef.current?.focus()}
            />
            <FormField
              name='description'
              ref={descriptionRef}
              label='Description'
              placeholder='Enter Description'
              testID='descriptionInput'
              onSubmitEditing={() => startTimeRef.current?.focus()}
            />
            <FormField
              name='startTime'
              ref={startTimeRef}
              label='Start Time'
              placeholder='Enter Start Time'
              testID='startTimeInput'
              inputType='datetime'
              onSubmitEditing={() => endTimeRef.current?.focus()}
            />
            <FormField
              name='endTime'
              ref={endTimeRef}
              label='End Time'
              placeholder='Enter End Time'
              testID='endTimeInput'
              inputType='datetime'
              onSubmitEditing={() => tagLineRef.current?.focus()}
            />
            <FormField
              name='tagLine'
              ref={tagLineRef}
              label='Tag Line'
              placeholder='Enter Tag Line'
              testID='tagLineInput'
              inputType='text'
              autoCapitalize='none'
              onSubmitEditing={() => imageCollectionRef.current?.focus()}
            />
            <FormField
              name='imageCollection'
              ref={imageCollectionRef}
              label='Image Collection'
              placeholder='Enter Image Collection'
              testID='imageCollectionInput'
              onSubmitEditing={() => videoCollectionRef.current?.focus()}
            />
            <FormField
              name='videoCollection'
              ref={videoCollectionRef}
              label='Video Collection'
              placeholder='Enter Video Collection'
              testID='videoCollectionInput'
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
    avatar: value.avatar ?? null,
    content: value.content ?? null,
    type: value.type ?? null,
    description: value.description ?? null,
    startTime: value.startTime ?? null,
    endTime: value.endTime ?? null,
    tagLine: value.tagLine ?? null,
    imageCollection: value.imageCollection ?? null,
    videoCollection: value.videoCollection ?? null,
    info: value.info && value.info.id ? value.info.id : null,
  };
};
const formValueToEntity = (value) =>
{
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    title: value.title ?? null,
    avatar: value.avatar ?? null,
    content: value.content ?? null,
    type: value.type ?? null,
    description: value.description ?? null,
    startTime: value.startTime ?? null,
    endTime: value.endTime ?? null,
    tagLine: value.tagLine ?? null,
    imageCollection: value.imageCollection ?? null,
    videoCollection: value.videoCollection ?? null,
  };
  entity.info = value.info ? {id: value.info} : null;
  return entity;
};

const mapStateToProps = (state) =>
{
  return {
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    event: state.events.event,
    fetching: state.events.fetchingOne,
    updating: state.events.updating,
    updateSuccess: state.events.updateSuccess,
    errorUpdating: state.events.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getEvent: (id) => dispatch(EventActions.eventRequest(id)),
    getAllEvents: (options) => dispatch(EventActions.eventAllRequest(options)),
    updateEvent: (event) => dispatch(EventActions.eventUpdateRequest(event)),
    reset: () => dispatch(EventActions.eventReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventEditScreen);
