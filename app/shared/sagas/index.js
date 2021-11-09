import {all, takeLatest} from 'redux-saga/effects';
import API from '../services/api';
import FixtureAPI from '../services/fixture-api';
import AppConfig from '../../config/app-config';

/* ------------- Types ------------- */
import {StartupTypes} from '../reducers/startup.reducer';
import {LoginTypes} from '../../modules/login/login.reducer';
import {AccountTypes} from '../../shared/reducers/account.reducer';
import {RegisterTypes} from '../../modules/account/register/register.reducer';
import {ForgotPasswordTypes} from '../../modules/account/password-reset/forgot-password.reducer';
import {ChangePasswordTypes} from '../../modules/account/password/change-password.reducer';
import {UserTypes} from '../../shared/reducers/user.reducer';
import {MessageGroupTypes} from '../../modules/entities/message-group/message-group.reducer';
import {MessageContentTypes} from '../../modules/entities/message-content/message-content.reducer';
import {HanhChinhVNTypes} from '../../modules/entities/hanh-chinh-vn/hanh-chinh-vn.reducer';
import {MasterUserTypes} from '../../modules/entities/master-user/master-user.reducer';
import {UserProfileTypes} from '../../modules/entities/user-profile/user-profile.reducer';
import {AccountStatusTypes} from '../../modules/entities/account-status/account-status.reducer';
import {DeviceStatusTypes} from '../../modules/entities/device-status/device-status.reducer';
import {FriendTypes} from '../../modules/entities/friend/friend.reducer';
import {FollowUserTypes} from '../../modules/entities/follow-user/follow-user.reducer';
import {FollowGroupTypes} from '../../modules/entities/follow-group/follow-group.reducer';
import {FollowPageTypes} from '../../modules/entities/follow-page/follow-page.reducer';
import {FileInfoTypes} from '../../modules/entities/file-info/file-info.reducer';
import {PagePostTypes} from '../../modules/entities/page-post/page-post.reducer';
import {PageProfileTypes} from '../../modules/entities/page-profile/page-profile.reducer';
import {GroupPostTypes} from '../../modules/entities/group-post/group-post.reducer';
import {PostTypes} from '../../modules/entities/post/post.reducer';
import {PostCommentTypes} from '../../modules/entities/post-comment/post-comment.reducer';
import {PostLikeTypes} from '../../modules/entities/post-like/post-like.reducer';
import {GroupProfileTypes} from '../../modules/entities/group-profile/group-profile.reducer';
import {NewsFeedTypes} from '../../modules/entities/news-feed/news-feed.reducer';
import {RankUserTypes} from '../../modules/entities/rank-user/rank-user.reducer';
import {RankGroupTypes} from '../../modules/entities/rank-group/rank-group.reducer';
import {NotificationTypes} from '../../modules/entities/notification/notification.reducer';
import {AlbumTypes} from '../../modules/entities/album/album.reducer';
import {VideoTypes} from '../../modules/entities/video/video.reducer';
import {ImageTypes} from '../../modules/entities/image/image.reducer';
import {VideoStreamTypes} from '../../modules/entities/video-stream/video-stream.reducer';
import {VideoLiveStreamBufferTypes} from '../../modules/entities/video-live-stream-buffer/video-live-stream-buffer.reducer';
import {TopicInterestTypes} from '../../modules/entities/topic-interest/topic-interest.reducer';
import {TodoListTypes} from '../../modules/entities/todo-list/todo-list.reducer';
import {EventTypes} from '../../modules/entities/event/event.reducer';
import {BaseInfoTypes} from '../../modules/entities/base-info/base-info.reducer';
import {PermissionTypes} from '../../modules/entities/permission/permission.reducer';
import {ClassInfoTypes} from '../../modules/entities/class-info/class-info.reducer';
import {HistoryUpdateTypes} from '../../modules/entities/history-update/history-update.reducer';
// jhipster-react-native-saga-redux-import-needle
/* ------------- Sagas ------------- */
import {startup} from './startup.saga';
import {login, loginLoad, logout} from '../../modules/login/login.sagas';
import {register} from '../../modules/account/register/register.sagas';
import {forgotPassword} from '../../modules/account/password-reset/forgot-password.sagas';
import {changePassword} from '../../modules/account/password/change-password.sagas';
import {getAccount, updateAccount} from '../../shared/sagas/account.sagas';
import UserSagas from '../../shared/sagas/user.sagas';
import MessageGroupSagas from '../../modules/entities/message-group/message-group.sagas';
import MessageContentSagas from '../../modules/entities/message-content/message-content.sagas';
import HanhChinhVNSagas from '../../modules/entities/hanh-chinh-vn/hanh-chinh-vn.sagas';
import MasterUserSagas from '../../modules/entities/master-user/master-user.sagas';
import UserProfileSagas from '../../modules/entities/user-profile/user-profile.sagas';
import AccountStatusSagas from '../../modules/entities/account-status/account-status.sagas';
import DeviceStatusSagas from '../../modules/entities/device-status/device-status.sagas';
import FriendSagas from '../../modules/entities/friend/friend.sagas';
import FollowUserSagas from '../../modules/entities/follow-user/follow-user.sagas';
import FollowGroupSagas from '../../modules/entities/follow-group/follow-group.sagas';
import FollowPageSagas from '../../modules/entities/follow-page/follow-page.sagas';
import FileInfoSagas from '../../modules/entities/file-info/file-info.sagas';
import PagePostSagas from '../../modules/entities/page-post/page-post.sagas';
import PageProfileSagas from '../../modules/entities/page-profile/page-profile.sagas';
import GroupPostSagas from '../../modules/entities/group-post/group-post.sagas';
import PostSagas from '../../modules/entities/post/post.sagas';
import PostCommentSagas from '../../modules/entities/post-comment/post-comment.sagas';
import PostLikeSagas from '../../modules/entities/post-like/post-like.sagas';
import GroupProfileSagas from '../../modules/entities/group-profile/group-profile.sagas';
import NewsFeedSagas from '../../modules/entities/news-feed/news-feed.sagas';
import RankUserSagas from '../../modules/entities/rank-user/rank-user.sagas';
import RankGroupSagas from '../../modules/entities/rank-group/rank-group.sagas';
import NotificationSagas from '../../modules/entities/notification/notification.sagas';
import AlbumSagas from '../../modules/entities/album/album.sagas';
import VideoSagas from '../../modules/entities/video/video.sagas';
import ImageSagas from '../../modules/entities/image/image.sagas';
import VideoStreamSagas from '../../modules/entities/video-stream/video-stream.sagas';
import VideoLiveStreamBufferSagas from '../../modules/entities/video-live-stream-buffer/video-live-stream-buffer.sagas';
import TopicInterestSagas from '../../modules/entities/topic-interest/topic-interest.sagas';
import TodoListSagas from '../../modules/entities/todo-list/todo-list.sagas';
import EventSagas from '../../modules/entities/event/event.sagas';
import BaseInfoSagas from '../../modules/entities/base-info/base-info.sagas';
import PermissionSagas from '../../modules/entities/permission/permission.sagas';
import ClassInfoSagas from '../../modules/entities/class-info/class-info.sagas';
import HistoryUpdateSagas from '../../modules/entities/history-update/history-update.sagas';
// jhipster-react-native-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
export const api = AppConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root()
{
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),

    takeLatest(MessageGroupTypes.MESSAGE_GROUP_REQUEST, MessageGroupSagas.getMessageGroup, api),
    takeLatest(MessageGroupTypes.MESSAGE_GROUP_ALL_REQUEST, MessageGroupSagas.getAllMessageGroups, api),
    takeLatest(MessageGroupTypes.MESSAGE_GROUP_UPDATE_REQUEST, MessageGroupSagas.updateMessageGroup, api),
    takeLatest(MessageGroupTypes.MESSAGE_GROUP_DELETE_REQUEST, MessageGroupSagas.deleteMessageGroup, api),
    takeLatest(MessageGroupTypes.MESSAGE_GROUP_SEARCH_REQUEST, MessageGroupSagas.searchMessageGroups, api),

    takeLatest(MessageContentTypes.MESSAGE_CONTENT_REQUEST, MessageContentSagas.getMessageContent, api),
    takeLatest(MessageContentTypes.MESSAGE_CONTENT_ALL_REQUEST, MessageContentSagas.getAllMessageContents, api),
    takeLatest(MessageContentTypes.MESSAGE_CONTENT_UPDATE_REQUEST, MessageContentSagas.updateMessageContent, api),
    takeLatest(MessageContentTypes.MESSAGE_CONTENT_DELETE_REQUEST, MessageContentSagas.deleteMessageContent, api),
    takeLatest(MessageContentTypes.MESSAGE_CONTENT_SEARCH_REQUEST, MessageContentSagas.searchMessageContents, api),

    takeLatest(HanhChinhVNTypes.HANH_CHINH_VN_REQUEST, HanhChinhVNSagas.getHanhChinhVN, api),
    takeLatest(HanhChinhVNTypes.HANH_CHINH_VN_ALL_REQUEST, HanhChinhVNSagas.getAllHanhChinhVNS, api),
    takeLatest(HanhChinhVNTypes.HANH_CHINH_VN_UPDATE_REQUEST, HanhChinhVNSagas.updateHanhChinhVN, api),
    takeLatest(HanhChinhVNTypes.HANH_CHINH_VN_DELETE_REQUEST, HanhChinhVNSagas.deleteHanhChinhVN, api),
    takeLatest(HanhChinhVNTypes.HANH_CHINH_VN_SEARCH_REQUEST, HanhChinhVNSagas.searchHanhChinhVNS, api),

    takeLatest(MasterUserTypes.MASTER_USER_REQUEST, MasterUserSagas.getMasterUser, api),
    takeLatest(MasterUserTypes.MASTER_USER_ALL_REQUEST, MasterUserSagas.getAllMasterUsers, api),
    takeLatest(MasterUserTypes.MASTER_USER_UPDATE_REQUEST, MasterUserSagas.updateMasterUser, api),
    takeLatest(MasterUserTypes.MASTER_USER_DELETE_REQUEST, MasterUserSagas.deleteMasterUser, api),
    takeLatest(MasterUserTypes.MASTER_USER_SEARCH_REQUEST, MasterUserSagas.searchMasterUsers, api),

    takeLatest(UserProfileTypes.USER_PROFILE_REQUEST, UserProfileSagas.getUserProfile, api),
    takeLatest(UserProfileTypes.USER_PROFILE_ALL_REQUEST, UserProfileSagas.getAllUserProfiles, api),
    takeLatest(UserProfileTypes.USER_PROFILE_UPDATE_REQUEST, UserProfileSagas.updateUserProfile, api),
    takeLatest(UserProfileTypes.USER_PROFILE_DELETE_REQUEST, UserProfileSagas.deleteUserProfile, api),
    takeLatest(UserProfileTypes.USER_PROFILE_SEARCH_REQUEST, UserProfileSagas.searchUserProfiles, api),

    takeLatest(AccountStatusTypes.ACCOUNT_STATUS_REQUEST, AccountStatusSagas.getAccountStatus, api),
    takeLatest(AccountStatusTypes.ACCOUNT_STATUS_ALL_REQUEST, AccountStatusSagas.getAllAccountStatuses, api),
    takeLatest(AccountStatusTypes.ACCOUNT_STATUS_UPDATE_REQUEST, AccountStatusSagas.updateAccountStatus, api),
    takeLatest(AccountStatusTypes.ACCOUNT_STATUS_DELETE_REQUEST, AccountStatusSagas.deleteAccountStatus, api),
    takeLatest(AccountStatusTypes.ACCOUNT_STATUS_SEARCH_REQUEST, AccountStatusSagas.searchAccountStatuses, api),

    takeLatest(DeviceStatusTypes.DEVICE_STATUS_REQUEST, DeviceStatusSagas.getDeviceStatus, api),
    takeLatest(DeviceStatusTypes.DEVICE_STATUS_ALL_REQUEST, DeviceStatusSagas.getAllDeviceStatuses, api),
    takeLatest(DeviceStatusTypes.DEVICE_STATUS_UPDATE_REQUEST, DeviceStatusSagas.updateDeviceStatus, api),
    takeLatest(DeviceStatusTypes.DEVICE_STATUS_DELETE_REQUEST, DeviceStatusSagas.deleteDeviceStatus, api),
    takeLatest(DeviceStatusTypes.DEVICE_STATUS_SEARCH_REQUEST, DeviceStatusSagas.searchDeviceStatuses, api),

    takeLatest(FriendTypes.FRIEND_REQUEST, FriendSagas.getFriend, api),
    takeLatest(FriendTypes.FRIEND_ALL_REQUEST, FriendSagas.getAllFriends, api),
    takeLatest(FriendTypes.FRIEND_UPDATE_REQUEST, FriendSagas.updateFriend, api),
    takeLatest(FriendTypes.FRIEND_DELETE_REQUEST, FriendSagas.deleteFriend, api),
    takeLatest(FriendTypes.FRIEND_SEARCH_REQUEST, FriendSagas.searchFriends, api),

    takeLatest(FollowUserTypes.FOLLOW_USER_REQUEST, FollowUserSagas.getFollowUser, api),
    takeLatest(FollowUserTypes.FOLLOW_USER_ALL_REQUEST, FollowUserSagas.getAllFollowUsers, api),
    takeLatest(FollowUserTypes.FOLLOW_USER_UPDATE_REQUEST, FollowUserSagas.updateFollowUser, api),
    takeLatest(FollowUserTypes.FOLLOW_USER_DELETE_REQUEST, FollowUserSagas.deleteFollowUser, api),
    takeLatest(FollowUserTypes.FOLLOW_USER_SEARCH_REQUEST, FollowUserSagas.searchFollowUsers, api),

    takeLatest(FollowGroupTypes.FOLLOW_GROUP_REQUEST, FollowGroupSagas.getFollowGroup, api),
    takeLatest(FollowGroupTypes.FOLLOW_GROUP_ALL_REQUEST, FollowGroupSagas.getAllFollowGroups, api),
    takeLatest(FollowGroupTypes.FOLLOW_GROUP_UPDATE_REQUEST, FollowGroupSagas.updateFollowGroup, api),
    takeLatest(FollowGroupTypes.FOLLOW_GROUP_DELETE_REQUEST, FollowGroupSagas.deleteFollowGroup, api),
    takeLatest(FollowGroupTypes.FOLLOW_GROUP_SEARCH_REQUEST, FollowGroupSagas.searchFollowGroups, api),

    takeLatest(FollowPageTypes.FOLLOW_PAGE_REQUEST, FollowPageSagas.getFollowPage, api),
    takeLatest(FollowPageTypes.FOLLOW_PAGE_ALL_REQUEST, FollowPageSagas.getAllFollowPages, api),
    takeLatest(FollowPageTypes.FOLLOW_PAGE_UPDATE_REQUEST, FollowPageSagas.updateFollowPage, api),
    takeLatest(FollowPageTypes.FOLLOW_PAGE_DELETE_REQUEST, FollowPageSagas.deleteFollowPage, api),
    takeLatest(FollowPageTypes.FOLLOW_PAGE_SEARCH_REQUEST, FollowPageSagas.searchFollowPages, api),

    takeLatest(FileInfoTypes.FILE_INFO_REQUEST, FileInfoSagas.getFileInfo, api),
    takeLatest(FileInfoTypes.FILE_INFO_ALL_REQUEST, FileInfoSagas.getAllFileInfos, api),
    takeLatest(FileInfoTypes.FILE_INFO_UPDATE_REQUEST, FileInfoSagas.updateFileInfo, api),
    takeLatest(FileInfoTypes.FILE_INFO_DELETE_REQUEST, FileInfoSagas.deleteFileInfo, api),
    takeLatest(FileInfoTypes.FILE_INFO_SEARCH_REQUEST, FileInfoSagas.searchFileInfos, api),

    takeLatest(PagePostTypes.PAGE_POST_REQUEST, PagePostSagas.getPagePost, api),
    takeLatest(PagePostTypes.PAGE_POST_ALL_REQUEST, PagePostSagas.getAllPagePosts, api),
    takeLatest(PagePostTypes.PAGE_POST_UPDATE_REQUEST, PagePostSagas.updatePagePost, api),
    takeLatest(PagePostTypes.PAGE_POST_DELETE_REQUEST, PagePostSagas.deletePagePost, api),
    takeLatest(PagePostTypes.PAGE_POST_SEARCH_REQUEST, PagePostSagas.searchPagePosts, api),

    takeLatest(PageProfileTypes.PAGE_PROFILE_REQUEST, PageProfileSagas.getPageProfile, api),
    takeLatest(PageProfileTypes.PAGE_PROFILE_ALL_REQUEST, PageProfileSagas.getAllPageProfiles, api),
    takeLatest(PageProfileTypes.PAGE_PROFILE_UPDATE_REQUEST, PageProfileSagas.updatePageProfile, api),
    takeLatest(PageProfileTypes.PAGE_PROFILE_DELETE_REQUEST, PageProfileSagas.deletePageProfile, api),
    takeLatest(PageProfileTypes.PAGE_PROFILE_SEARCH_REQUEST, PageProfileSagas.searchPageProfiles, api),

    takeLatest(GroupPostTypes.GROUP_POST_REQUEST, GroupPostSagas.getGroupPost, api),
    takeLatest(GroupPostTypes.GROUP_POST_ALL_REQUEST, GroupPostSagas.getAllGroupPosts, api),
    takeLatest(GroupPostTypes.GROUP_POST_UPDATE_REQUEST, GroupPostSagas.updateGroupPost, api),
    takeLatest(GroupPostTypes.GROUP_POST_DELETE_REQUEST, GroupPostSagas.deleteGroupPost, api),
    takeLatest(GroupPostTypes.GROUP_POST_SEARCH_REQUEST, GroupPostSagas.searchGroupPosts, api),

    takeLatest(PostTypes.POST_REQUEST, PostSagas.getPost, api),
    takeLatest(PostTypes.POST_ALL_REQUEST, PostSagas.getAllPosts, api),
    takeLatest(PostTypes.POST_UPDATE_REQUEST, PostSagas.updatePost, api),
    takeLatest(PostTypes.POST_DELETE_REQUEST, PostSagas.deletePost, api),
    takeLatest(PostTypes.POST_SEARCH_REQUEST, PostSagas.searchPosts, api),

    takeLatest(PostCommentTypes.POST_COMMENT_REQUEST, PostCommentSagas.getPostComment, api),
    takeLatest(PostCommentTypes.POST_COMMENT_ALL_REQUEST, PostCommentSagas.getAllPostComments, api),
    takeLatest(PostCommentTypes.POST_COMMENT_UPDATE_REQUEST, PostCommentSagas.updatePostComment, api),
    takeLatest(PostCommentTypes.POST_COMMENT_DELETE_REQUEST, PostCommentSagas.deletePostComment, api),
    takeLatest(PostCommentTypes.POST_COMMENT_SEARCH_REQUEST, PostCommentSagas.searchPostComments, api),

    takeLatest(PostLikeTypes.POST_LIKE_REQUEST, PostLikeSagas.getPostLike, api),
    takeLatest(PostLikeTypes.POST_LIKE_ALL_REQUEST, PostLikeSagas.getAllPostLikes, api),
    takeLatest(PostLikeTypes.POST_LIKE_UPDATE_REQUEST, PostLikeSagas.updatePostLike, api),
    takeLatest(PostLikeTypes.POST_LIKE_DELETE_REQUEST, PostLikeSagas.deletePostLike, api),
    takeLatest(PostLikeTypes.POST_LIKE_SEARCH_REQUEST, PostLikeSagas.searchPostLikes, api),

    takeLatest(GroupProfileTypes.GROUP_PROFILE_REQUEST, GroupProfileSagas.getGroupProfile, api),
    takeLatest(GroupProfileTypes.GROUP_PROFILE_ALL_REQUEST, GroupProfileSagas.getAllGroupProfiles, api),
    takeLatest(GroupProfileTypes.GROUP_PROFILE_UPDATE_REQUEST, GroupProfileSagas.updateGroupProfile, api),
    takeLatest(GroupProfileTypes.GROUP_PROFILE_DELETE_REQUEST, GroupProfileSagas.deleteGroupProfile, api),
    takeLatest(GroupProfileTypes.GROUP_PROFILE_SEARCH_REQUEST, GroupProfileSagas.searchGroupProfiles, api),

    takeLatest(NewsFeedTypes.NEWS_FEED_REQUEST, NewsFeedSagas.getNewsFeed, api),
    takeLatest(NewsFeedTypes.NEWS_FEED_ALL_REQUEST, NewsFeedSagas.getAllNewsFeeds, api),
    takeLatest(NewsFeedTypes.NEWS_FEED_UPDATE_REQUEST, NewsFeedSagas.updateNewsFeed, api),
    takeLatest(NewsFeedTypes.NEWS_FEED_DELETE_REQUEST, NewsFeedSagas.deleteNewsFeed, api),
    takeLatest(NewsFeedTypes.NEWS_FEED_SEARCH_REQUEST, NewsFeedSagas.searchNewsFeeds, api),

    takeLatest(RankUserTypes.RANK_USER_REQUEST, RankUserSagas.getRankUser, api),
    takeLatest(RankUserTypes.RANK_USER_ALL_REQUEST, RankUserSagas.getAllRankUsers, api),
    takeLatest(RankUserTypes.RANK_USER_UPDATE_REQUEST, RankUserSagas.updateRankUser, api),
    takeLatest(RankUserTypes.RANK_USER_DELETE_REQUEST, RankUserSagas.deleteRankUser, api),
    takeLatest(RankUserTypes.RANK_USER_SEARCH_REQUEST, RankUserSagas.searchRankUsers, api),

    takeLatest(RankGroupTypes.RANK_GROUP_REQUEST, RankGroupSagas.getRankGroup, api),
    takeLatest(RankGroupTypes.RANK_GROUP_ALL_REQUEST, RankGroupSagas.getAllRankGroups, api),
    takeLatest(RankGroupTypes.RANK_GROUP_UPDATE_REQUEST, RankGroupSagas.updateRankGroup, api),
    takeLatest(RankGroupTypes.RANK_GROUP_DELETE_REQUEST, RankGroupSagas.deleteRankGroup, api),
    takeLatest(RankGroupTypes.RANK_GROUP_SEARCH_REQUEST, RankGroupSagas.searchRankGroups, api),

    takeLatest(NotificationTypes.NOTIFICATION_REQUEST, NotificationSagas.getNotification, api),
    takeLatest(NotificationTypes.NOTIFICATION_ALL_REQUEST, NotificationSagas.getAllNotifications, api),
    takeLatest(NotificationTypes.NOTIFICATION_UPDATE_REQUEST, NotificationSagas.updateNotification, api),
    takeLatest(NotificationTypes.NOTIFICATION_DELETE_REQUEST, NotificationSagas.deleteNotification, api),
    takeLatest(NotificationTypes.NOTIFICATION_SEARCH_REQUEST, NotificationSagas.searchNotifications, api),

    takeLatest(AlbumTypes.ALBUM_REQUEST, AlbumSagas.getAlbum, api),
    takeLatest(AlbumTypes.ALBUM_ALL_REQUEST, AlbumSagas.getAllAlbums, api),
    takeLatest(AlbumTypes.ALBUM_UPDATE_REQUEST, AlbumSagas.updateAlbum, api),
    takeLatest(AlbumTypes.ALBUM_DELETE_REQUEST, AlbumSagas.deleteAlbum, api),
    takeLatest(AlbumTypes.ALBUM_SEARCH_REQUEST, AlbumSagas.searchAlbums, api),

    takeLatest(VideoTypes.VIDEO_REQUEST, VideoSagas.getVideo, api),
    takeLatest(VideoTypes.VIDEO_ALL_REQUEST, VideoSagas.getAllVideos, api),
    takeLatest(VideoTypes.VIDEO_UPDATE_REQUEST, VideoSagas.updateVideo, api),
    takeLatest(VideoTypes.VIDEO_DELETE_REQUEST, VideoSagas.deleteVideo, api),
    takeLatest(VideoTypes.VIDEO_SEARCH_REQUEST, VideoSagas.searchVideos, api),

    takeLatest(ImageTypes.IMAGE_REQUEST, ImageSagas.getImage, api),
    takeLatest(ImageTypes.IMAGE_ALL_REQUEST, ImageSagas.getAllImages, api),
    takeLatest(ImageTypes.IMAGE_UPDATE_REQUEST, ImageSagas.updateImage, api),
    takeLatest(ImageTypes.IMAGE_DELETE_REQUEST, ImageSagas.deleteImage, api),
    takeLatest(ImageTypes.IMAGE_SEARCH_REQUEST, ImageSagas.searchImages, api),

    takeLatest(VideoStreamTypes.VIDEO_STREAM_REQUEST, VideoStreamSagas.getVideoStream, api),
    takeLatest(VideoStreamTypes.VIDEO_STREAM_ALL_REQUEST, VideoStreamSagas.getAllVideoStreams, api),
    takeLatest(VideoStreamTypes.VIDEO_STREAM_UPDATE_REQUEST, VideoStreamSagas.updateVideoStream, api),
    takeLatest(VideoStreamTypes.VIDEO_STREAM_DELETE_REQUEST, VideoStreamSagas.deleteVideoStream, api),
    takeLatest(VideoStreamTypes.VIDEO_STREAM_SEARCH_REQUEST, VideoStreamSagas.searchVideoStreams, api),

    takeLatest(VideoLiveStreamBufferTypes.VIDEO_LIVE_STREAM_BUFFER_REQUEST, VideoLiveStreamBufferSagas.getVideoLiveStreamBuffer, api),
    takeLatest(
      VideoLiveStreamBufferTypes.VIDEO_LIVE_STREAM_BUFFER_ALL_REQUEST,
      VideoLiveStreamBufferSagas.getAllVideoLiveStreamBuffers,
      api,
    ),
    takeLatest(
      VideoLiveStreamBufferTypes.VIDEO_LIVE_STREAM_BUFFER_UPDATE_REQUEST,
      VideoLiveStreamBufferSagas.updateVideoLiveStreamBuffer,
      api,
    ),
    takeLatest(
      VideoLiveStreamBufferTypes.VIDEO_LIVE_STREAM_BUFFER_DELETE_REQUEST,
      VideoLiveStreamBufferSagas.deleteVideoLiveStreamBuffer,
      api,
    ),
    takeLatest(
      VideoLiveStreamBufferTypes.VIDEO_LIVE_STREAM_BUFFER_SEARCH_REQUEST,
      VideoLiveStreamBufferSagas.searchVideoLiveStreamBuffers,
      api,
    ),

    takeLatest(TopicInterestTypes.TOPIC_INTEREST_REQUEST, TopicInterestSagas.getTopicInterest, api),
    takeLatest(TopicInterestTypes.TOPIC_INTEREST_ALL_REQUEST, TopicInterestSagas.getAllTopicInterests, api),
    takeLatest(TopicInterestTypes.TOPIC_INTEREST_UPDATE_REQUEST, TopicInterestSagas.updateTopicInterest, api),
    takeLatest(TopicInterestTypes.TOPIC_INTEREST_DELETE_REQUEST, TopicInterestSagas.deleteTopicInterest, api),
    takeLatest(TopicInterestTypes.TOPIC_INTEREST_SEARCH_REQUEST, TopicInterestSagas.searchTopicInterests, api),

    takeLatest(TodoListTypes.TODO_LIST_REQUEST, TodoListSagas.getTodoList, api),
    takeLatest(TodoListTypes.TODO_LIST_ALL_REQUEST, TodoListSagas.getAllTodoLists, api),
    takeLatest(TodoListTypes.TODO_LIST_UPDATE_REQUEST, TodoListSagas.updateTodoList, api),
    takeLatest(TodoListTypes.TODO_LIST_DELETE_REQUEST, TodoListSagas.deleteTodoList, api),
    takeLatest(TodoListTypes.TODO_LIST_SEARCH_REQUEST, TodoListSagas.searchTodoLists, api),

    takeLatest(EventTypes.EVENT_REQUEST, EventSagas.getEvent, api),
    takeLatest(EventTypes.EVENT_ALL_REQUEST, EventSagas.getAllEvents, api),
    takeLatest(EventTypes.EVENT_UPDATE_REQUEST, EventSagas.updateEvent, api),
    takeLatest(EventTypes.EVENT_DELETE_REQUEST, EventSagas.deleteEvent, api),
    takeLatest(EventTypes.EVENT_SEARCH_REQUEST, EventSagas.searchEvents, api),

    takeLatest(BaseInfoTypes.BASE_INFO_REQUEST, BaseInfoSagas.getBaseInfo, api),
    takeLatest(BaseInfoTypes.BASE_INFO_ALL_REQUEST, BaseInfoSagas.getAllBaseInfos, api),
    takeLatest(BaseInfoTypes.BASE_INFO_UPDATE_REQUEST, BaseInfoSagas.updateBaseInfo, api),
    takeLatest(BaseInfoTypes.BASE_INFO_DELETE_REQUEST, BaseInfoSagas.deleteBaseInfo, api),
    takeLatest(BaseInfoTypes.BASE_INFO_SEARCH_REQUEST, BaseInfoSagas.searchBaseInfos, api),

    takeLatest(PermissionTypes.PERMISSION_REQUEST, PermissionSagas.getPermission, api),
    takeLatest(PermissionTypes.PERMISSION_ALL_REQUEST, PermissionSagas.getAllPermissions, api),
    takeLatest(PermissionTypes.PERMISSION_UPDATE_REQUEST, PermissionSagas.updatePermission, api),
    takeLatest(PermissionTypes.PERMISSION_DELETE_REQUEST, PermissionSagas.deletePermission, api),
    takeLatest(PermissionTypes.PERMISSION_SEARCH_REQUEST, PermissionSagas.searchPermissions, api),

    takeLatest(ClassInfoTypes.CLASS_INFO_REQUEST, ClassInfoSagas.getClassInfo, api),
    takeLatest(ClassInfoTypes.CLASS_INFO_ALL_REQUEST, ClassInfoSagas.getAllClassInfos, api),
    takeLatest(ClassInfoTypes.CLASS_INFO_UPDATE_REQUEST, ClassInfoSagas.updateClassInfo, api),
    takeLatest(ClassInfoTypes.CLASS_INFO_DELETE_REQUEST, ClassInfoSagas.deleteClassInfo, api),
    takeLatest(ClassInfoTypes.CLASS_INFO_SEARCH_REQUEST, ClassInfoSagas.searchClassInfos, api),

    takeLatest(HistoryUpdateTypes.HISTORY_UPDATE_REQUEST, HistoryUpdateSagas.getHistoryUpdate, api),
    takeLatest(HistoryUpdateTypes.HISTORY_UPDATE_ALL_REQUEST, HistoryUpdateSagas.getAllHistoryUpdates, api),
    takeLatest(HistoryUpdateTypes.HISTORY_UPDATE_UPDATE_REQUEST, HistoryUpdateSagas.updateHistoryUpdate, api),
    takeLatest(HistoryUpdateTypes.HISTORY_UPDATE_DELETE_REQUEST, HistoryUpdateSagas.deleteHistoryUpdate, api),
    takeLatest(HistoryUpdateTypes.HISTORY_UPDATE_SEARCH_REQUEST, HistoryUpdateSagas.searchHistoryUpdates, api),
    // jhipster-react-native-saga-redux-connect-needle

    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(ChangePasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),
    takeLatest(UserTypes.USER_REQUEST, UserSagas.getUser, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, UserSagas.updateUser, api),
    takeLatest(UserTypes.USER_DELETE_REQUEST, UserSagas.deleteUser, api),
    takeLatest(UserTypes.USER_ALL_REQUEST, UserSagas.getAllUsers, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api),
  ]);
}
