import * as React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { DrawerButton } from './drawer/drawer-button';
import { navigate, goBackOrIfParamsOrDefault } from './nav-ref';

// import screens
import EntitiesScreen from '../modules/entities/entities-screen';
import MessageGroupScreen from '../modules/entities/message-group/message-group-screen';
import MessageGroupDetailScreen from '../modules/entities/message-group/message-group-detail-screen';
import MessageGroupEditScreen from '../modules/entities/message-group/message-group-edit-screen';
import MessageContentScreen from '../modules/entities/message-content/message-content-screen';
import MessageContentDetailScreen from '../modules/entities/message-content/message-content-detail-screen';
import MessageContentEditScreen from '../modules/entities/message-content/message-content-edit-screen';
import HanhChinhVNScreen from '../modules/entities/hanh-chinh-vn/hanh-chinh-vn-screen';
import HanhChinhVNDetailScreen from '../modules/entities/hanh-chinh-vn/hanh-chinh-vn-detail-screen';
import HanhChinhVNEditScreen from '../modules/entities/hanh-chinh-vn/hanh-chinh-vn-edit-screen';
import MasterUserScreen from '../modules/entities/master-user/master-user-screen';
import MasterUserDetailScreen from '../modules/entities/master-user/master-user-detail-screen';
import MasterUserEditScreen from '../modules/entities/master-user/master-user-edit-screen';
import UserProfileScreen from '../modules/entities/user-profile/user-profile-screen';
import UserProfileDetailScreen from '../modules/entities/user-profile/user-profile-detail-screen';
import UserProfileEditScreen from '../modules/entities/user-profile/user-profile-edit-screen';
import AccountStatusScreen from '../modules/entities/account-status/account-status-screen';
import AccountStatusDetailScreen from '../modules/entities/account-status/account-status-detail-screen';
import AccountStatusEditScreen from '../modules/entities/account-status/account-status-edit-screen';
import DeviceStatusScreen from '../modules/entities/device-status/device-status-screen';
import DeviceStatusDetailScreen from '../modules/entities/device-status/device-status-detail-screen';
import DeviceStatusEditScreen from '../modules/entities/device-status/device-status-edit-screen';
import FriendScreen from '../modules/entities/friend/friend-screen';
import FriendDetailScreen from '../modules/entities/friend/friend-detail-screen';
import FriendEditScreen from '../modules/entities/friend/friend-edit-screen';
import FollowUserScreen from '../modules/entities/follow-user/follow-user-screen';
import FollowUserDetailScreen from '../modules/entities/follow-user/follow-user-detail-screen';
import FollowUserEditScreen from '../modules/entities/follow-user/follow-user-edit-screen';
import FollowGroupScreen from '../modules/entities/follow-group/follow-group-screen';
import FollowGroupDetailScreen from '../modules/entities/follow-group/follow-group-detail-screen';
import FollowGroupEditScreen from '../modules/entities/follow-group/follow-group-edit-screen';
import FollowPageScreen from '../modules/entities/follow-page/follow-page-screen';
import FollowPageDetailScreen from '../modules/entities/follow-page/follow-page-detail-screen';
import FollowPageEditScreen from '../modules/entities/follow-page/follow-page-edit-screen';
import FileInfoScreen from '../modules/entities/file-info/file-info-screen';
import FileInfoDetailScreen from '../modules/entities/file-info/file-info-detail-screen';
import FileInfoEditScreen from '../modules/entities/file-info/file-info-edit-screen';
import PagePostScreen from '../modules/entities/page-post/page-post-screen';
import PagePostDetailScreen from '../modules/entities/page-post/page-post-detail-screen';
import PagePostEditScreen from '../modules/entities/page-post/page-post-edit-screen';
import PageProfileScreen from '../modules/entities/page-profile/page-profile-screen';
import PageProfileDetailScreen from '../modules/entities/page-profile/page-profile-detail-screen';
import PageProfileEditScreen from '../modules/entities/page-profile/page-profile-edit-screen';
import GroupPostScreen from '../modules/entities/group-post/group-post-screen';
import GroupPostDetailScreen from '../modules/entities/group-post/group-post-detail-screen';
import GroupPostEditScreen from '../modules/entities/group-post/group-post-edit-screen';
import PostScreen from '../modules/entities/post/post-screen';
import PostDetailScreen from '../modules/entities/post/post-detail-screen';
import PostEditScreen from '../modules/entities/post/post-edit-screen';
import PostCommentScreen from '../modules/entities/post-comment/post-comment-screen';
import PostCommentDetailScreen from '../modules/entities/post-comment/post-comment-detail-screen';
import PostCommentEditScreen from '../modules/entities/post-comment/post-comment-edit-screen';
import PostLikeScreen from '../modules/entities/post-like/post-like-screen';
import PostLikeDetailScreen from '../modules/entities/post-like/post-like-detail-screen';
import PostLikeEditScreen from '../modules/entities/post-like/post-like-edit-screen';
import GroupProfileScreen from '../modules/entities/group-profile/group-profile-screen';
import GroupProfileDetailScreen from '../modules/entities/group-profile/group-profile-detail-screen';
import GroupProfileEditScreen from '../modules/entities/group-profile/group-profile-edit-screen';
import NewsFeedScreen from '../modules/entities/news-feed/news-feed-screen';
import NewsFeedDetailScreen from '../modules/entities/news-feed/news-feed-detail-screen';
import NewsFeedEditScreen from '../modules/entities/news-feed/news-feed-edit-screen';
import RankUserScreen from '../modules/entities/rank-user/rank-user-screen';
import RankUserDetailScreen from '../modules/entities/rank-user/rank-user-detail-screen';
import RankUserEditScreen from '../modules/entities/rank-user/rank-user-edit-screen';
import RankGroupScreen from '../modules/entities/rank-group/rank-group-screen';
import RankGroupDetailScreen from '../modules/entities/rank-group/rank-group-detail-screen';
import RankGroupEditScreen from '../modules/entities/rank-group/rank-group-edit-screen';
import NotificationScreen from '../modules/entities/notification/notification-screen';
import NotificationDetailScreen from '../modules/entities/notification/notification-detail-screen';
import NotificationEditScreen from '../modules/entities/notification/notification-edit-screen';
import AlbumScreen from '../modules/entities/album/album-screen';
import AlbumDetailScreen from '../modules/entities/album/album-detail-screen';
import AlbumEditScreen from '../modules/entities/album/album-edit-screen';
import VideoScreen from '../modules/entities/video/video-screen';
import VideoDetailScreen from '../modules/entities/video/video-detail-screen';
import VideoEditScreen from '../modules/entities/video/video-edit-screen';
import ImageScreen from '../modules/entities/image/image-screen';
import ImageDetailScreen from '../modules/entities/image/image-detail-screen';
import ImageEditScreen from '../modules/entities/image/image-edit-screen';
import VideoStreamScreen from '../modules/entities/video-stream/video-stream-screen';
import VideoStreamDetailScreen from '../modules/entities/video-stream/video-stream-detail-screen';
import VideoStreamEditScreen from '../modules/entities/video-stream/video-stream-edit-screen';
import VideoLiveStreamBufferScreen from '../modules/entities/video-live-stream-buffer/video-live-stream-buffer-screen';
import VideoLiveStreamBufferDetailScreen from '../modules/entities/video-live-stream-buffer/video-live-stream-buffer-detail-screen';
import VideoLiveStreamBufferEditScreen from '../modules/entities/video-live-stream-buffer/video-live-stream-buffer-edit-screen';
import TopicInterestScreen from '../modules/entities/topic-interest/topic-interest-screen';
import TopicInterestDetailScreen from '../modules/entities/topic-interest/topic-interest-detail-screen';
import TopicInterestEditScreen from '../modules/entities/topic-interest/topic-interest-edit-screen';
import TodoListScreen from '../modules/entities/todo-list/todo-list-screen';
import TodoListDetailScreen from '../modules/entities/todo-list/todo-list-detail-screen';
import TodoListEditScreen from '../modules/entities/todo-list/todo-list-edit-screen';
import EventScreen from '../modules/entities/event/event-screen';
import EventDetailScreen from '../modules/entities/event/event-detail-screen';
import EventEditScreen from '../modules/entities/event/event-edit-screen';
import BaseInfoScreen from '../modules/entities/base-info/base-info-screen';
import BaseInfoDetailScreen from '../modules/entities/base-info/base-info-detail-screen';
import BaseInfoEditScreen from '../modules/entities/base-info/base-info-edit-screen';
import PermissionScreen from '../modules/entities/permission/permission-screen';
import PermissionDetailScreen from '../modules/entities/permission/permission-detail-screen';
import PermissionEditScreen from '../modules/entities/permission/permission-edit-screen';
import ClassInfoScreen from '../modules/entities/class-info/class-info-screen';
import ClassInfoDetailScreen from '../modules/entities/class-info/class-info-detail-screen';
import ClassInfoEditScreen from '../modules/entities/class-info/class-info-edit-screen';
import HistoryUpdateScreen from '../modules/entities/history-update/history-update-screen';
import HistoryUpdateDetailScreen from '../modules/entities/history-update/history-update-detail-screen';
import HistoryUpdateEditScreen from '../modules/entities/history-update/history-update-edit-screen';
// jhipster-react-native-navigation-import-needle

export const entityScreens = [
  {
    name: 'Entities',
    route: '',
    component: EntitiesScreen,
    options: {
      headerLeft: DrawerButton,
    },
  },
  {
    name: 'MessageGroup',
    route: 'message-group',
    component: MessageGroupScreen,
    options: {
      title: 'MessageGroups',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('MessageGroupEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'MessageGroupDetail',
    route: 'message-group/detail',
    component: MessageGroupDetailScreen,
    options: { title: 'View MessageGroup', headerLeft: () => <HeaderBackButton onPress={() => navigate('MessageGroup')} /> },
  },
  {
    name: 'MessageGroupEdit',
    route: 'message-group/edit',
    component: MessageGroupEditScreen,
    options: {
      title: 'Edit MessageGroup',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('MessageGroupDetail', 'MessageGroup')} />,
    },
  },
  {
    name: 'MessageContent',
    route: 'message-content',
    component: MessageContentScreen,
    options: {
      title: 'MessageContents',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('MessageContentEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'MessageContentDetail',
    route: 'message-content/detail',
    component: MessageContentDetailScreen,
    options: { title: 'View MessageContent', headerLeft: () => <HeaderBackButton onPress={() => navigate('MessageContent')} /> },
  },
  {
    name: 'MessageContentEdit',
    route: 'message-content/edit',
    component: MessageContentEditScreen,
    options: {
      title: 'Edit MessageContent',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('MessageContentDetail', 'MessageContent')} />,
    },
  },
  {
    name: 'HanhChinhVN',
    route: 'hanh-chinh-vn',
    component: HanhChinhVNScreen,
    options: {
      title: 'HanhChinhVNS',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('HanhChinhVNEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'HanhChinhVNDetail',
    route: 'hanh-chinh-vn/detail',
    component: HanhChinhVNDetailScreen,
    options: { title: 'View HanhChinhVN', headerLeft: () => <HeaderBackButton onPress={() => navigate('HanhChinhVN')} /> },
  },
  {
    name: 'HanhChinhVNEdit',
    route: 'hanh-chinh-vn/edit',
    component: HanhChinhVNEditScreen,
    options: {
      title: 'Edit HanhChinhVN',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('HanhChinhVNDetail', 'HanhChinhVN')} />,
    },
  },
  {
    name: 'MasterUser',
    route: 'master-user',
    component: MasterUserScreen,
    options: {
      title: 'MasterUsers',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('MasterUserEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'MasterUserDetail',
    route: 'master-user/detail',
    component: MasterUserDetailScreen,
    options: { title: 'View MasterUser', headerLeft: () => <HeaderBackButton onPress={() => navigate('MasterUser')} /> },
  },
  {
    name: 'MasterUserEdit',
    route: 'master-user/edit',
    component: MasterUserEditScreen,
    options: {
      title: 'Edit MasterUser',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('MasterUserDetail', 'MasterUser')} />,
    },
  },
  {
    name: 'UserProfile',
    route: 'user-profile',
    component: UserProfileScreen,
    options: {
      title: 'UserProfiles',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('UserProfileEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'UserProfileDetail',
    route: 'user-profile/detail',
    component: UserProfileDetailScreen,
    options: { title: 'View UserProfile', headerLeft: () => <HeaderBackButton onPress={() => navigate('UserProfile')} /> },
  },
  {
    name: 'UserProfileEdit',
    route: 'user-profile/edit',
    component: UserProfileEditScreen,
    options: {
      title: 'Edit UserProfile',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('UserProfileDetail', 'UserProfile')} />,
    },
  },
  {
    name: 'AccountStatus',
    route: 'account-status',
    component: AccountStatusScreen,
    options: {
      title: 'AccountStatuses',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('AccountStatusEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'AccountStatusDetail',
    route: 'account-status/detail',
    component: AccountStatusDetailScreen,
    options: { title: 'View AccountStatus', headerLeft: () => <HeaderBackButton onPress={() => navigate('AccountStatus')} /> },
  },
  {
    name: 'AccountStatusEdit',
    route: 'account-status/edit',
    component: AccountStatusEditScreen,
    options: {
      title: 'Edit AccountStatus',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('AccountStatusDetail', 'AccountStatus')} />,
    },
  },
  {
    name: 'DeviceStatus',
    route: 'device-status',
    component: DeviceStatusScreen,
    options: {
      title: 'DeviceStatuses',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('DeviceStatusEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'DeviceStatusDetail',
    route: 'device-status/detail',
    component: DeviceStatusDetailScreen,
    options: { title: 'View DeviceStatus', headerLeft: () => <HeaderBackButton onPress={() => navigate('DeviceStatus')} /> },
  },
  {
    name: 'DeviceStatusEdit',
    route: 'device-status/edit',
    component: DeviceStatusEditScreen,
    options: {
      title: 'Edit DeviceStatus',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('DeviceStatusDetail', 'DeviceStatus')} />,
    },
  },
  {
    name: 'Friend',
    route: 'friend',
    component: FriendScreen,
    options: {
      title: 'Friends',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('FriendEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'FriendDetail',
    route: 'friend/detail',
    component: FriendDetailScreen,
    options: { title: 'View Friend', headerLeft: () => <HeaderBackButton onPress={() => navigate('Friend')} /> },
  },
  {
    name: 'FriendEdit',
    route: 'friend/edit',
    component: FriendEditScreen,
    options: {
      title: 'Edit Friend',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('FriendDetail', 'Friend')} />,
    },
  },
  {
    name: 'FollowUser',
    route: 'follow-user',
    component: FollowUserScreen,
    options: {
      title: 'FollowUsers',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('FollowUserEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'FollowUserDetail',
    route: 'follow-user/detail',
    component: FollowUserDetailScreen,
    options: { title: 'View FollowUser', headerLeft: () => <HeaderBackButton onPress={() => navigate('FollowUser')} /> },
  },
  {
    name: 'FollowUserEdit',
    route: 'follow-user/edit',
    component: FollowUserEditScreen,
    options: {
      title: 'Edit FollowUser',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('FollowUserDetail', 'FollowUser')} />,
    },
  },
  {
    name: 'FollowGroup',
    route: 'follow-group',
    component: FollowGroupScreen,
    options: {
      title: 'FollowGroups',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('FollowGroupEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'FollowGroupDetail',
    route: 'follow-group/detail',
    component: FollowGroupDetailScreen,
    options: { title: 'View FollowGroup', headerLeft: () => <HeaderBackButton onPress={() => navigate('FollowGroup')} /> },
  },
  {
    name: 'FollowGroupEdit',
    route: 'follow-group/edit',
    component: FollowGroupEditScreen,
    options: {
      title: 'Edit FollowGroup',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('FollowGroupDetail', 'FollowGroup')} />,
    },
  },
  {
    name: 'FollowPage',
    route: 'follow-page',
    component: FollowPageScreen,
    options: {
      title: 'FollowPages',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('FollowPageEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'FollowPageDetail',
    route: 'follow-page/detail',
    component: FollowPageDetailScreen,
    options: { title: 'View FollowPage', headerLeft: () => <HeaderBackButton onPress={() => navigate('FollowPage')} /> },
  },
  {
    name: 'FollowPageEdit',
    route: 'follow-page/edit',
    component: FollowPageEditScreen,
    options: {
      title: 'Edit FollowPage',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('FollowPageDetail', 'FollowPage')} />,
    },
  },
  {
    name: 'FileInfo',
    route: 'file-info',
    component: FileInfoScreen,
    options: {
      title: 'FileInfos',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('FileInfoEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'FileInfoDetail',
    route: 'file-info/detail',
    component: FileInfoDetailScreen,
    options: { title: 'View FileInfo', headerLeft: () => <HeaderBackButton onPress={() => navigate('FileInfo')} /> },
  },
  {
    name: 'FileInfoEdit',
    route: 'file-info/edit',
    component: FileInfoEditScreen,
    options: {
      title: 'Edit FileInfo',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('FileInfoDetail', 'FileInfo')} />,
    },
  },
  {
    name: 'PagePost',
    route: 'page-post',
    component: PagePostScreen,
    options: {
      title: 'PagePosts',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('PagePostEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'PagePostDetail',
    route: 'page-post/detail',
    component: PagePostDetailScreen,
    options: { title: 'View PagePost', headerLeft: () => <HeaderBackButton onPress={() => navigate('PagePost')} /> },
  },
  {
    name: 'PagePostEdit',
    route: 'page-post/edit',
    component: PagePostEditScreen,
    options: {
      title: 'Edit PagePost',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('PagePostDetail', 'PagePost')} />,
    },
  },
  {
    name: 'PageProfile',
    route: 'page-profile',
    component: PageProfileScreen,
    options: {
      title: 'PageProfiles',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('PageProfileEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'PageProfileDetail',
    route: 'page-profile/detail',
    component: PageProfileDetailScreen,
    options: { title: 'View PageProfile', headerLeft: () => <HeaderBackButton onPress={() => navigate('PageProfile')} /> },
  },
  {
    name: 'PageProfileEdit',
    route: 'page-profile/edit',
    component: PageProfileEditScreen,
    options: {
      title: 'Edit PageProfile',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('PageProfileDetail', 'PageProfile')} />,
    },
  },
  {
    name: 'GroupPost',
    route: 'group-post',
    component: GroupPostScreen,
    options: {
      title: 'GroupPosts',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('GroupPostEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'GroupPostDetail',
    route: 'group-post/detail',
    component: GroupPostDetailScreen,
    options: { title: 'View GroupPost', headerLeft: () => <HeaderBackButton onPress={() => navigate('GroupPost')} /> },
  },
  {
    name: 'GroupPostEdit',
    route: 'group-post/edit',
    component: GroupPostEditScreen,
    options: {
      title: 'Edit GroupPost',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('GroupPostDetail', 'GroupPost')} />,
    },
  },
  {
    name: 'Post',
    route: 'post',
    component: PostScreen,
    options: {
      title: 'Posts',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('PostEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'PostDetail',
    route: 'post/detail',
    component: PostDetailScreen,
    options: { title: 'View Post', headerLeft: () => <HeaderBackButton onPress={() => navigate('Post')} /> },
  },
  {
    name: 'PostEdit',
    route: 'post/edit',
    component: PostEditScreen,
    options: { title: 'Edit Post', headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('PostDetail', 'Post')} /> },
  },
  {
    name: 'PostComment',
    route: 'post-comment',
    component: PostCommentScreen,
    options: {
      title: 'PostComments',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('PostCommentEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'PostCommentDetail',
    route: 'post-comment/detail',
    component: PostCommentDetailScreen,
    options: { title: 'View PostComment', headerLeft: () => <HeaderBackButton onPress={() => navigate('PostComment')} /> },
  },
  {
    name: 'PostCommentEdit',
    route: 'post-comment/edit',
    component: PostCommentEditScreen,
    options: {
      title: 'Edit PostComment',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('PostCommentDetail', 'PostComment')} />,
    },
  },
  {
    name: 'PostLike',
    route: 'post-like',
    component: PostLikeScreen,
    options: {
      title: 'PostLikes',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('PostLikeEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'PostLikeDetail',
    route: 'post-like/detail',
    component: PostLikeDetailScreen,
    options: { title: 'View PostLike', headerLeft: () => <HeaderBackButton onPress={() => navigate('PostLike')} /> },
  },
  {
    name: 'PostLikeEdit',
    route: 'post-like/edit',
    component: PostLikeEditScreen,
    options: {
      title: 'Edit PostLike',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('PostLikeDetail', 'PostLike')} />,
    },
  },
  {
    name: 'GroupProfile',
    route: 'group-profile',
    component: GroupProfileScreen,
    options: {
      title: 'GroupProfiles',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('GroupProfileEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'GroupProfileDetail',
    route: 'group-profile/detail',
    component: GroupProfileDetailScreen,
    options: { title: 'View GroupProfile', headerLeft: () => <HeaderBackButton onPress={() => navigate('GroupProfile')} /> },
  },
  {
    name: 'GroupProfileEdit',
    route: 'group-profile/edit',
    component: GroupProfileEditScreen,
    options: {
      title: 'Edit GroupProfile',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('GroupProfileDetail', 'GroupProfile')} />,
    },
  },
  {
    name: 'NewsFeed',
    route: 'news-feed',
    component: NewsFeedScreen,
    options: {
      title: 'NewsFeeds',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('NewsFeedEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'NewsFeedDetail',
    route: 'news-feed/detail',
    component: NewsFeedDetailScreen,
    options: { title: 'View NewsFeed', headerLeft: () => <HeaderBackButton onPress={() => navigate('NewsFeed')} /> },
  },
  {
    name: 'NewsFeedEdit',
    route: 'news-feed/edit',
    component: NewsFeedEditScreen,
    options: {
      title: 'Edit NewsFeed',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('NewsFeedDetail', 'NewsFeed')} />,
    },
  },
  {
    name: 'RankUser',
    route: 'rank-user',
    component: RankUserScreen,
    options: {
      title: 'RankUsers',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('RankUserEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'RankUserDetail',
    route: 'rank-user/detail',
    component: RankUserDetailScreen,
    options: { title: 'View RankUser', headerLeft: () => <HeaderBackButton onPress={() => navigate('RankUser')} /> },
  },
  {
    name: 'RankUserEdit',
    route: 'rank-user/edit',
    component: RankUserEditScreen,
    options: {
      title: 'Edit RankUser',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('RankUserDetail', 'RankUser')} />,
    },
  },
  {
    name: 'RankGroup',
    route: 'rank-group',
    component: RankGroupScreen,
    options: {
      title: 'RankGroups',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('RankGroupEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'RankGroupDetail',
    route: 'rank-group/detail',
    component: RankGroupDetailScreen,
    options: { title: 'View RankGroup', headerLeft: () => <HeaderBackButton onPress={() => navigate('RankGroup')} /> },
  },
  {
    name: 'RankGroupEdit',
    route: 'rank-group/edit',
    component: RankGroupEditScreen,
    options: {
      title: 'Edit RankGroup',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('RankGroupDetail', 'RankGroup')} />,
    },
  },
  {
    name: 'Notification',
    route: 'notification',
    component: NotificationScreen,
    options: {
      title: 'Notifications',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('NotificationEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'NotificationDetail',
    route: 'notification/detail',
    component: NotificationDetailScreen,
    options: { title: 'View Notification', headerLeft: () => <HeaderBackButton onPress={() => navigate('Notification')} /> },
  },
  {
    name: 'NotificationEdit',
    route: 'notification/edit',
    component: NotificationEditScreen,
    options: {
      title: 'Edit Notification',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('NotificationDetail', 'Notification')} />,
    },
  },
  {
    name: 'Album',
    route: 'album',
    component: AlbumScreen,
    options: {
      title: 'Albums',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('AlbumEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'AlbumDetail',
    route: 'album/detail',
    component: AlbumDetailScreen,
    options: { title: 'View Album', headerLeft: () => <HeaderBackButton onPress={() => navigate('Album')} /> },
  },
  {
    name: 'AlbumEdit',
    route: 'album/edit',
    component: AlbumEditScreen,
    options: {
      title: 'Edit Album',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('AlbumDetail', 'Album')} />,
    },
  },
  {
    name: 'Video',
    route: 'video',
    component: VideoScreen,
    options: {
      title: 'Videos',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('VideoEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'VideoDetail',
    route: 'video/detail',
    component: VideoDetailScreen,
    options: { title: 'View Video', headerLeft: () => <HeaderBackButton onPress={() => navigate('Video')} /> },
  },
  {
    name: 'VideoEdit',
    route: 'video/edit',
    component: VideoEditScreen,
    options: {
      title: 'Edit Video',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('VideoDetail', 'Video')} />,
    },
  },
  {
    name: 'Image',
    route: 'image',
    component: ImageScreen,
    options: {
      title: 'Images',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('ImageEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'ImageDetail',
    route: 'image/detail',
    component: ImageDetailScreen,
    options: { title: 'View Image', headerLeft: () => <HeaderBackButton onPress={() => navigate('Image')} /> },
  },
  {
    name: 'ImageEdit',
    route: 'image/edit',
    component: ImageEditScreen,
    options: {
      title: 'Edit Image',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('ImageDetail', 'Image')} />,
    },
  },
  {
    name: 'VideoStream',
    route: 'video-stream',
    component: VideoStreamScreen,
    options: {
      title: 'VideoStreams',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('VideoStreamEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'VideoStreamDetail',
    route: 'video-stream/detail',
    component: VideoStreamDetailScreen,
    options: { title: 'View VideoStream', headerLeft: () => <HeaderBackButton onPress={() => navigate('VideoStream')} /> },
  },
  {
    name: 'VideoStreamEdit',
    route: 'video-stream/edit',
    component: VideoStreamEditScreen,
    options: {
      title: 'Edit VideoStream',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('VideoStreamDetail', 'VideoStream')} />,
    },
  },
  {
    name: 'VideoLiveStreamBuffer',
    route: 'video-live-stream-buffer',
    component: VideoLiveStreamBufferScreen,
    options: {
      title: 'VideoLiveStreamBuffers',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('VideoLiveStreamBufferEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'VideoLiveStreamBufferDetail',
    route: 'video-live-stream-buffer/detail',
    component: VideoLiveStreamBufferDetailScreen,
    options: {
      title: 'View VideoLiveStreamBuffer',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('VideoLiveStreamBuffer')} />,
    },
  },
  {
    name: 'VideoLiveStreamBufferEdit',
    route: 'video-live-stream-buffer/edit',
    component: VideoLiveStreamBufferEditScreen,
    options: {
      title: 'Edit VideoLiveStreamBuffer',
      headerLeft: () => (
        <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('VideoLiveStreamBufferDetail', 'VideoLiveStreamBuffer')} />
      ),
    },
  },
  {
    name: 'TopicInterest',
    route: 'topic-interest',
    component: TopicInterestScreen,
    options: {
      title: 'TopicInterests',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('TopicInterestEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'TopicInterestDetail',
    route: 'topic-interest/detail',
    component: TopicInterestDetailScreen,
    options: { title: 'View TopicInterest', headerLeft: () => <HeaderBackButton onPress={() => navigate('TopicInterest')} /> },
  },
  {
    name: 'TopicInterestEdit',
    route: 'topic-interest/edit',
    component: TopicInterestEditScreen,
    options: {
      title: 'Edit TopicInterest',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('TopicInterestDetail', 'TopicInterest')} />,
    },
  },
  {
    name: 'TodoList',
    route: 'todo-list',
    component: TodoListScreen,
    options: {
      title: 'TodoLists',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('TodoListEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'TodoListDetail',
    route: 'todo-list/detail',
    component: TodoListDetailScreen,
    options: { title: 'View TodoList', headerLeft: () => <HeaderBackButton onPress={() => navigate('TodoList')} /> },
  },
  {
    name: 'TodoListEdit',
    route: 'todo-list/edit',
    component: TodoListEditScreen,
    options: {
      title: 'Edit TodoList',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('TodoListDetail', 'TodoList')} />,
    },
  },
  {
    name: 'Event',
    route: 'event',
    component: EventScreen,
    options: {
      title: 'Events',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('EventEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'EventDetail',
    route: 'event/detail',
    component: EventDetailScreen,
    options: { title: 'View Event', headerLeft: () => <HeaderBackButton onPress={() => navigate('Event')} /> },
  },
  {
    name: 'EventEdit',
    route: 'event/edit',
    component: EventEditScreen,
    options: {
      title: 'Edit Event',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('EventDetail', 'Event')} />,
    },
  },
  {
    name: 'BaseInfo',
    route: 'base-info',
    component: BaseInfoScreen,
    options: {
      title: 'BaseInfos',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('BaseInfoEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'BaseInfoDetail',
    route: 'base-info/detail',
    component: BaseInfoDetailScreen,
    options: { title: 'View BaseInfo', headerLeft: () => <HeaderBackButton onPress={() => navigate('BaseInfo')} /> },
  },
  {
    name: 'BaseInfoEdit',
    route: 'base-info/edit',
    component: BaseInfoEditScreen,
    options: {
      title: 'Edit BaseInfo',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('BaseInfoDetail', 'BaseInfo')} />,
    },
  },
  {
    name: 'Permission',
    route: 'permission',
    component: PermissionScreen,
    options: {
      title: 'Permissions',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('PermissionEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'PermissionDetail',
    route: 'permission/detail',
    component: PermissionDetailScreen,
    options: { title: 'View Permission', headerLeft: () => <HeaderBackButton onPress={() => navigate('Permission')} /> },
  },
  {
    name: 'PermissionEdit',
    route: 'permission/edit',
    component: PermissionEditScreen,
    options: {
      title: 'Edit Permission',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('PermissionDetail', 'Permission')} />,
    },
  },
  {
    name: 'ClassInfo',
    route: 'class-info',
    component: ClassInfoScreen,
    options: {
      title: 'ClassInfos',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('ClassInfoEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'ClassInfoDetail',
    route: 'class-info/detail',
    component: ClassInfoDetailScreen,
    options: { title: 'View ClassInfo', headerLeft: () => <HeaderBackButton onPress={() => navigate('ClassInfo')} /> },
  },
  {
    name: 'ClassInfoEdit',
    route: 'class-info/edit',
    component: ClassInfoEditScreen,
    options: {
      title: 'Edit ClassInfo',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('ClassInfoDetail', 'ClassInfo')} />,
    },
  },
  {
    name: 'HistoryUpdate',
    route: 'history-update',
    component: HistoryUpdateScreen,
    options: {
      title: 'HistoryUpdates',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('HistoryUpdateEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'HistoryUpdateDetail',
    route: 'history-update/detail',
    component: HistoryUpdateDetailScreen,
    options: { title: 'View HistoryUpdate', headerLeft: () => <HeaderBackButton onPress={() => navigate('HistoryUpdate')} /> },
  },
  {
    name: 'HistoryUpdateEdit',
    route: 'history-update/edit',
    component: HistoryUpdateEditScreen,
    options: {
      title: 'Edit HistoryUpdate',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('HistoryUpdateDetail', 'HistoryUpdate')} />,
    },
  },
  // jhipster-react-native-navigation-declaration-needle
];

export const getEntityRoutes = () => {
  const routes = {};
  entityScreens.forEach((screen) => {
    routes[screen.name] = screen.route;
  });
  return routes;
};

const EntityStack = createStackNavigator();

export default function EntityStackScreen() {
  return (
    <EntityStack.Navigator>
      {entityScreens.map((screen, index) => {
        return <EntityStack.Screen name={screen.name} component={screen.component} key={index} options={screen.options} />;
      })}
    </EntityStack.Navigator>
  );
}
