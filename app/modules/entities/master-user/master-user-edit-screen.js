import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import MasterUserActions from './master-user.reducer';
import UserActions from '../../../shared/reducers/user.reducer';
import RankUserActions from '../rank-user/rank-user.reducer';
import BaseInfoActions from '../base-info/base-info.reducer';
import TopicInterestActions from '../topic-interest/topic-interest.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './master-user-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  uuid: Yup.string().required(),
  fullName: Yup.string().required(),
});

function MasterUserEditScreen(props) {
  const {
    getMasterUser,
    updateMasterUser,
    route,
    masterUser,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllUsers,
    userList,
    getAllRankUsers,
    rankUserList,
    getAllBaseInfos,
    baseInfoList,
    getAllTopicInterests,
    topicInterestList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getMasterUser(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getMasterUser, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(masterUser));
    }
  }, [masterUser, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllUsers();
    getAllRankUsers();
    getAllBaseInfos();
    getAllTopicInterests();
  }, [getAllUsers, getAllRankUsers, getAllBaseInfos, getAllTopicInterests]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('MasterUserDetail', { entityId: masterUser?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateMasterUser(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const uuidRef = createRef();
  const fullNameRef = createRef();
  const nicknameRef = createRef();
  const avatarRef = createRef();
  const quickInfoRef = createRef();
  const userRef = createRef();
  const myRankRef = createRef();
  const infoRef = createRef();
  const topicInterestsRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="masterUserEditScrollView"
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
              onSubmitEditing={() => fullNameRef.current?.focus()}
            />
            <FormField
              name="fullName"
              ref={fullNameRef}
              label="Full Name"
              placeholder="Enter Full Name"
              testID="fullNameInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => nicknameRef.current?.focus()}
            />
            <FormField
              name="nickname"
              ref={nicknameRef}
              label="Nickname"
              placeholder="Enter Nickname"
              testID="nicknameInput"
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
              onSubmitEditing={() => quickInfoRef.current?.focus()}
            />
            <FormField name="quickInfo" ref={quickInfoRef} label="Quick Info" placeholder="Enter Quick Info" testID="quickInfoInput" />
            <FormField
              name="user"
              inputType="select-one"
              ref={userRef}
              listItems={userList}
              listItemLabelField="id"
              label="User"
              placeholder="Select User"
              testID="userSelectInput"
            />
            <FormField
              name="myRank"
              inputType="select-one"
              ref={myRankRef}
              listItems={rankUserList}
              listItemLabelField="id"
              label="My Rank"
              placeholder="Select My Rank"
              testID="rankUserSelectInput"
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
              name="topicInterests"
              inputType="select-multiple"
              ref={topicInterestsRef}
              listItems={topicInterestList}
              listItemLabelField="id"
              label="Topic Interest"
              placeholder="Select Topic Interest"
              testID="topicInterestSelectInput"
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
    fullName: value.fullName ?? null,
    nickname: value.nickname ?? null,
    avatar: value.avatar ?? null,
    quickInfo: value.quickInfo ?? null,
    user: value.user && value.user.id ? value.user.id : null,
    myRank: value.myRank && value.myRank.id ? value.myRank.id : null,
    info: value.info && value.info.id ? value.info.id : null,
    topicInterests: value.topicInterests?.map((i) => i.id),
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    uuid: value.uuid ?? null,
    fullName: value.fullName ?? null,
    nickname: value.nickname ?? null,
    avatar: value.avatar ?? null,
    quickInfo: value.quickInfo ?? null,
  };
  entity.user = value.user ? { id: value.user } : null;
  entity.myRank = value.myRank ? { id: value.myRank } : null;
  entity.info = value.info ? { id: value.info } : null;
  entity.topicInterests = value.topicInterests.map((id) => ({ id }));
  return entity;
};

const mapStateToProps = (state) => {
  return {
    userList: state.users.userList ?? [],
    rankUserList: state.rankUsers.rankUserList ?? [],
    baseInfoList: state.baseInfos.baseInfoList ?? [],
    topicInterestList: state.topicInterests.topicInterestList ?? [],
    masterUser: state.masterUsers.masterUser,
    fetching: state.masterUsers.fetchingOne,
    updating: state.masterUsers.updating,
    updateSuccess: state.masterUsers.updateSuccess,
    errorUpdating: state.masterUsers.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: (options) => dispatch(UserActions.userAllRequest(options)),
    getAllRankUsers: (options) => dispatch(RankUserActions.rankUserAllRequest(options)),
    getAllBaseInfos: (options) => dispatch(BaseInfoActions.baseInfoAllRequest(options)),
    getAllTopicInterests: (options) => dispatch(TopicInterestActions.topicInterestAllRequest(options)),
    getMasterUser: (id) => dispatch(MasterUserActions.masterUserRequest(id)),
    getAllMasterUsers: (options) => dispatch(MasterUserActions.masterUserAllRequest(options)),
    updateMasterUser: (masterUser) => dispatch(MasterUserActions.masterUserUpdateRequest(masterUser)),
    reset: () => dispatch(MasterUserActions.masterUserReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MasterUserEditScreen);
