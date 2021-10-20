import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import configureStore from './create-store';
import rootSaga from '../sagas';
import ReduxPersist from '../../config/redux-persist';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  appState: require('./app-state.reducer').reducer,
  users: require('./user.reducer').reducer,
  messageGroups: require('../../modules/entities/message-group/message-group.reducer').reducer,
  messageContents: require('../../modules/entities/message-content/message-content.reducer').reducer,
  hanhChinhVNS: require('../../modules/entities/hanh-chinh-vn/hanh-chinh-vn.reducer').reducer,
  masterUsers: require('../../modules/entities/master-user/master-user.reducer').reducer,
  userProfiles: require('../../modules/entities/user-profile/user-profile.reducer').reducer,
  accountStatuses: require('../../modules/entities/account-status/account-status.reducer').reducer,
  deviceStatuses: require('../../modules/entities/device-status/device-status.reducer').reducer,
  friends: require('../../modules/entities/friend/friend.reducer').reducer,
  followUsers: require('../../modules/entities/follow-user/follow-user.reducer').reducer,
  followGroups: require('../../modules/entities/follow-group/follow-group.reducer').reducer,
  followPages: require('../../modules/entities/follow-page/follow-page.reducer').reducer,
  fileInfos: require('../../modules/entities/file-info/file-info.reducer').reducer,
  pagePosts: require('../../modules/entities/page-post/page-post.reducer').reducer,
  pageProfiles: require('../../modules/entities/page-profile/page-profile.reducer').reducer,
  groupPosts: require('../../modules/entities/group-post/group-post.reducer').reducer,
  posts: require('../../modules/entities/post/post.reducer').reducer,
  postComments: require('../../modules/entities/post-comment/post-comment.reducer').reducer,
  postLikes: require('../../modules/entities/post-like/post-like.reducer').reducer,
  groupProfiles: require('../../modules/entities/group-profile/group-profile.reducer').reducer,
  newsFeeds: require('../../modules/entities/news-feed/news-feed.reducer').reducer,
  rankUsers: require('../../modules/entities/rank-user/rank-user.reducer').reducer,
  rankGroups: require('../../modules/entities/rank-group/rank-group.reducer').reducer,
  notifications: require('../../modules/entities/notification/notification.reducer').reducer,
  albums: require('../../modules/entities/album/album.reducer').reducer,
  videos: require('../../modules/entities/video/video.reducer').reducer,
  images: require('../../modules/entities/image/image.reducer').reducer,
  videoStreams: require('../../modules/entities/video-stream/video-stream.reducer').reducer,
  videoLiveStreamBuffers: require('../../modules/entities/video-live-stream-buffer/video-live-stream-buffer.reducer').reducer,
  topicInterests: require('../../modules/entities/topic-interest/topic-interest.reducer').reducer,
  todoLists: require('../../modules/entities/todo-list/todo-list.reducer').reducer,
  events: require('../../modules/entities/event/event.reducer').reducer,
  baseInfos: require('../../modules/entities/base-info/base-info.reducer').reducer,
  permissions: require('../../modules/entities/permission/permission.reducer').reducer,
  classInfos: require('../../modules/entities/class-info/class-info.reducer').reducer,
  historyUpdates: require('../../modules/entities/history-update/history-update.reducer').reducer,
  // jhipster-react-native-redux-store-import-needle
  chat: require('../../modules/chat/chat.reducer').reducer,
  account: require('./account.reducer').reducer,
  login: require('../../modules/login/login.reducer').reducer,
  register: require('../../modules/account/register/register.reducer').reducer,
  changePassword: require('../../modules/account/password/change-password.reducer').reducer,
  forgotPassword: require('../../modules/account/password-reset/forgot-password.reducer').reducer,
});

export default () => {
  let finalReducers = reducers;
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig;
    finalReducers = persistReducer(persistConfig, reducers);
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./index').reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require('../sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas);
      });
    });
  }

  return store;
};
