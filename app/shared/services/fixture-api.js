export default {
  // Functions return fixtures

  // entity fixtures
  updateMessageGroup: (messageGroup) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-message-group.json'),
    };
  },
  getAllMessageGroups: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-message-groups.json'),
    };
  },
  getMessageGroup: (messageGroupId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-message-group.json'),
    };
  },
  deleteMessageGroup: (messageGroupId) =>
  {
    return {
      ok: true,
    };
  },
  searchMessageGroups: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-message-groups.json'),
    };
  },
  updateMessageContent: (messageContent) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-message-content.json'),
    };
  },
  getAllMessageContents: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-message-contents.json'),
    };
  },
  getMessageContent: (messageContentId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-message-content.json'),
    };
  },
  deleteMessageContent: (messageContentId) =>
  {
    return {
      ok: true,
    };
  },
  searchMessageContents: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-message-contents.json'),
    };
  },
  updateHanhChinhVN: (hanhChinhVN) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-hanh-chinh-vn.json'),
    };
  },
  getAllHanhChinhVNS: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-hanh-chinh-vns.json'),
    };
  },
  getHanhChinhVN: (hanhChinhVNId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-hanh-chinh-vn.json'),
    };
  },
  deleteHanhChinhVN: (hanhChinhVNId) =>
  {
    return {
      ok: true,
    };
  },
  searchHanhChinhVNS: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-hanh-chinh-vns.json'),
    };
  },
  updateMasterUser: (masterUser) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-master-user.json'),
    };
  },
  getAllMasterUsers: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-master-users.json'),
    };
  },
  getMasterUser: (masterUserId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-master-user.json'),
    };
  },
  deleteMasterUser: (masterUserId) =>
  {
    return {
      ok: true,
    };
  },
  searchMasterUsers: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-master-users.json'),
    };
  },
  updateUserProfile: (userProfile) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-user-profile.json'),
    };
  },
  getAllUserProfiles: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-user-profiles.json'),
    };
  },
  getUserProfile: (userProfileId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-user-profile.json'),
    };
  },
  deleteUserProfile: (userProfileId) =>
  {
    return {
      ok: true,
    };
  },
  searchUserProfiles: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-user-profiles.json'),
    };
  },
  updateAccountStatus: (accountStatus) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-account-status.json'),
    };
  },
  getAllAccountStatuses: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-account-statuses.json'),
    };
  },
  getAccountStatus: (accountStatusId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-account-status.json'),
    };
  },
  deleteAccountStatus: (accountStatusId) =>
  {
    return {
      ok: true,
    };
  },
  searchAccountStatuses: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-account-statuses.json'),
    };
  },
  updateDeviceStatus: (deviceStatus) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-device-status.json'),
    };
  },
  getAllDeviceStatuses: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-device-statuses.json'),
    };
  },
  getDeviceStatus: (deviceStatusId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-device-status.json'),
    };
  },
  deleteDeviceStatus: (deviceStatusId) =>
  {
    return {
      ok: true,
    };
  },
  searchDeviceStatuses: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-device-statuses.json'),
    };
  },
  updateFriend: (friend) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-friend.json'),
    };
  },
  getAllFriends: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-friends.json'),
    };
  },
  getFriend: (friendId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-friend.json'),
    };
  },
  deleteFriend: (friendId) =>
  {
    return {
      ok: true,
    };
  },
  searchFriends: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-friends.json'),
    };
  },
  updateFollowUser: (followUser) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-follow-user.json'),
    };
  },
  getAllFollowUsers: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-follow-users.json'),
    };
  },
  getFollowUser: (followUserId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-follow-user.json'),
    };
  },
  deleteFollowUser: (followUserId) =>
  {
    return {
      ok: true,
    };
  },
  searchFollowUsers: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-follow-users.json'),
    };
  },
  updateFollowGroup: (followGroup) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-follow-group.json'),
    };
  },
  getAllFollowGroups: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-follow-groups.json'),
    };
  },
  getFollowGroup: (followGroupId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-follow-group.json'),
    };
  },
  deleteFollowGroup: (followGroupId) =>
  {
    return {
      ok: true,
    };
  },
  searchFollowGroups: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-follow-groups.json'),
    };
  },
  updateFollowPage: (followPage) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-follow-page.json'),
    };
  },
  getAllFollowPages: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-follow-pages.json'),
    };
  },
  getFollowPage: (followPageId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-follow-page.json'),
    };
  },
  deleteFollowPage: (followPageId) =>
  {
    return {
      ok: true,
    };
  },
  searchFollowPages: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-follow-pages.json'),
    };
  },
  updateFileInfo: (fileInfo) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-file-info.json'),
    };
  },
  getAllFileInfos: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-file-infos.json'),
    };
  },
  getFileInfo: (fileInfoId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-file-info.json'),
    };
  },
  deleteFileInfo: (fileInfoId) =>
  {
    return {
      ok: true,
    };
  },
  searchFileInfos: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-file-infos.json'),
    };
  },
  updatePagePost: (pagePost) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-page-post.json'),
    };
  },
  getAllPagePosts: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-page-posts.json'),
    };
  },
  getPagePost: (pagePostId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-page-post.json'),
    };
  },
  deletePagePost: (pagePostId) =>
  {
    return {
      ok: true,
    };
  },
  searchPagePosts: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-page-posts.json'),
    };
  },
  updatePageProfile: (pageProfile) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-page-profile.json'),
    };
  },
  getAllPageProfiles: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-page-profiles.json'),
    };
  },
  getPageProfile: (pageProfileId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-page-profile.json'),
    };
  },
  deletePageProfile: (pageProfileId) =>
  {
    return {
      ok: true,
    };
  },
  searchPageProfiles: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-page-profiles.json'),
    };
  },
  updateGroupPost: (groupPost) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-group-post.json'),
    };
  },
  getAllGroupPosts: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-group-posts.json'),
    };
  },
  getGroupPost: (groupPostId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-group-post.json'),
    };
  },
  deleteGroupPost: (groupPostId) =>
  {
    return {
      ok: true,
    };
  },
  searchGroupPosts: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-group-posts.json'),
    };
  },
  updatePost: (post) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-post.json'),
    };
  },
  getAllPosts: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-posts.json'),
    };
  },
  getPost: (postId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-post.json'),
    };
  },
  deletePost: (postId) =>
  {
    return {
      ok: true,
    };
  },
  searchPosts: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-posts.json'),
    };
  },
  updatePostComment: (postComment) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-post-comment.json'),
    };
  },
  getAllPostComments: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-post-comments.json'),
    };
  },
  getPostComment: (postCommentId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-post-comment.json'),
    };
  },
  deletePostComment: (postCommentId) =>
  {
    return {
      ok: true,
    };
  },
  searchPostComments: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-post-comments.json'),
    };
  },
  updatePostLike: (postLike) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-post-like.json'),
    };
  },
  getAllPostLikes: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-post-likes.json'),
    };
  },
  getPostLike: (postLikeId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-post-like.json'),
    };
  },
  deletePostLike: (postLikeId) =>
  {
    return {
      ok: true,
    };
  },
  searchPostLikes: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-post-likes.json'),
    };
  },
  updateGroupProfile: (groupProfile) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-group-profile.json'),
    };
  },
  getAllGroupProfiles: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-group-profiles.json'),
    };
  },
  getGroupProfile: (groupProfileId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-group-profile.json'),
    };
  },
  deleteGroupProfile: (groupProfileId) =>
  {
    return {
      ok: true,
    };
  },
  searchGroupProfiles: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-group-profiles.json'),
    };
  },
  updateNewsFeed: (newsFeed) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-news-feed.json'),
    };
  },
  getAllNewsFeeds: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-news-feeds.json'),
    };
  },
  getNewsFeed: (newsFeedId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-news-feed.json'),
    };
  },
  deleteNewsFeed: (newsFeedId) =>
  {
    return {
      ok: true,
    };
  },
  searchNewsFeeds: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-news-feeds.json'),
    };
  },
  updateRankUser: (rankUser) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-rank-user.json'),
    };
  },
  getAllRankUsers: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-rank-users.json'),
    };
  },
  getRankUser: (rankUserId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-rank-user.json'),
    };
  },
  deleteRankUser: (rankUserId) =>
  {
    return {
      ok: true,
    };
  },
  searchRankUsers: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-rank-users.json'),
    };
  },
  updateRankGroup: (rankGroup) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-rank-group.json'),
    };
  },
  getAllRankGroups: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-rank-groups.json'),
    };
  },
  getRankGroup: (rankGroupId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-rank-group.json'),
    };
  },
  deleteRankGroup: (rankGroupId) =>
  {
    return {
      ok: true,
    };
  },
  searchRankGroups: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-rank-groups.json'),
    };
  },
  updateNotification: (notification) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-notification.json'),
    };
  },
  getAllNotifications: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-notifications.json'),
    };
  },
  getNotification: (notificationId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-notification.json'),
    };
  },
  deleteNotification: (notificationId) =>
  {
    return {
      ok: true,
    };
  },
  searchNotifications: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-notifications.json'),
    };
  },
  updateAlbum: (album) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-album.json'),
    };
  },
  getAllAlbums: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-albums.json'),
    };
  },
  getAlbum: (albumId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-album.json'),
    };
  },
  deleteAlbum: (albumId) =>
  {
    return {
      ok: true,
    };
  },
  searchAlbums: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-albums.json'),
    };
  },
  updateVideo: (video) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-video.json'),
    };
  },
  getAllVideos: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-videos.json'),
    };
  },
  getVideo: (videoId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-video.json'),
    };
  },
  deleteVideo: (videoId) =>
  {
    return {
      ok: true,
    };
  },
  searchVideos: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-videos.json'),
    };
  },
  updateImage: (image) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-image.json'),
    };
  },
  getAllImages: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-images.json'),
    };
  },
  getImage: (imageId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-image.json'),
    };
  },
  deleteImage: (imageId) =>
  {
    return {
      ok: true,
    };
  },
  searchImages: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-images.json'),
    };
  },
  updateVideoStream: (videoStream) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-video-stream.json'),
    };
  },
  getAllVideoStreams: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-video-streams.json'),
    };
  },
  getVideoStream: (videoStreamId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-video-stream.json'),
    };
  },
  deleteVideoStream: (videoStreamId) =>
  {
    return {
      ok: true,
    };
  },
  searchVideoStreams: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-video-streams.json'),
    };
  },
  updateVideoLiveStreamBuffer: (videoLiveStreamBuffer) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-video-live-stream-buffer.json'),
    };
  },
  getAllVideoLiveStreamBuffers: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-video-live-stream-buffers.json'),
    };
  },
  getVideoLiveStreamBuffer: (videoLiveStreamBufferId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-video-live-stream-buffer.json'),
    };
  },
  deleteVideoLiveStreamBuffer: (videoLiveStreamBufferId) =>
  {
    return {
      ok: true,
    };
  },
  searchVideoLiveStreamBuffers: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-video-live-stream-buffers.json'),
    };
  },
  updateTopicInterest: (topicInterest) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-topic-interest.json'),
    };
  },
  getAllTopicInterests: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-topic-interests.json'),
    };
  },
  getTopicInterest: (topicInterestId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-topic-interest.json'),
    };
  },
  deleteTopicInterest: (topicInterestId) =>
  {
    return {
      ok: true,
    };
  },
  searchTopicInterests: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-topic-interests.json'),
    };
  },
  updateTodoList: (todoList) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-todo-list.json'),
    };
  },
  getAllTodoLists: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-todo-lists.json'),
    };
  },
  getTodoList: (todoListId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-todo-list.json'),
    };
  },
  deleteTodoList: (todoListId) =>
  {
    return {
      ok: true,
    };
  },
  searchTodoLists: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-todo-lists.json'),
    };
  },
  updateEvent: (event) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-event.json'),
    };
  },
  getAllEvents: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-events.json'),
    };
  },
  getEvent: (eventId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-event.json'),
    };
  },
  deleteEvent: (eventId) =>
  {
    return {
      ok: true,
    };
  },
  searchEvents: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-events.json'),
    };
  },
  updateBaseInfo: (baseInfo) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-base-info.json'),
    };
  },
  getAllBaseInfos: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-base-infos.json'),
    };
  },
  getBaseInfo: (baseInfoId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-base-info.json'),
    };
  },
  deleteBaseInfo: (baseInfoId) =>
  {
    return {
      ok: true,
    };
  },
  searchBaseInfos: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-base-infos.json'),
    };
  },
  updatePermission: (permission) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-permission.json'),
    };
  },
  getAllPermissions: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-permissions.json'),
    };
  },
  getPermission: (permissionId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-permission.json'),
    };
  },
  deletePermission: (permissionId) =>
  {
    return {
      ok: true,
    };
  },
  searchPermissions: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-permissions.json'),
    };
  },
  updateClassInfo: (classInfo) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-class-info.json'),
    };
  },
  getAllClassInfos: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-class-infos.json'),
    };
  },
  getClassInfo: (classInfoId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-class-info.json'),
    };
  },
  deleteClassInfo: (classInfoId) =>
  {
    return {
      ok: true,
    };
  },
  searchClassInfos: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-class-infos.json'),
    };
  },
  updateHistoryUpdate: (historyUpdate) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-history-update.json'),
    };
  },
  getAllHistoryUpdates: () =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-history-updates.json'),
    };
  },
  getHistoryUpdate: (historyUpdateId) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-history-update.json'),
    };
  },
  deleteHistoryUpdate: (historyUpdateId) =>
  {
    return {
      ok: true,
    };
  },
  searchHistoryUpdates: (query) =>
  {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-history-updates.json'),
    };
  },
  // jhipster-react-native-api-fixture-needle

  // user fixtures
  updateUser: (user) =>
  {
    return {
      ok: true,
      data: require('../fixtures/update-user.json'),
    };
  },
  getAllUsers: () =>
  {
    return {
      ok: true,
      data: require('../fixtures/get-users.json'),
    };
  },
  getUser: (userId) =>
  {
    return {
      ok: true,
      data: require('../fixtures/get-user.json'),
    };
  },
  deleteUser: (userId) =>
  {
    return {
      ok: true,
    };
  },
  // auth fixtures
  setAuthToken: () =>
  {
  },
  removeAuthToken: () =>
  {
  },
  login: (authObj) =>
  {
    if (authObj.username === 'user' && authObj.password === 'user')
    {
      return {
        ok: true,
        data: require('../fixtures/login.json'),
      };
    }
    else
    {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials',
      };
    }
  },
  register: ({user}) =>
  {
    if (user === 'user')
    {
      return {
        ok: true,
      };
    }
    else
    {
      return {
        ok: false,
        data: {
          title: 'Invalid email',
        },
      };
    }
  },
  forgotPassword: ({email}) =>
  {
    if (email === 'valid@gmail.com')
    {
      return {
        ok: true,
      };
    }
    else
    {
      return {
        ok: false,
        data: 'Invalid email',
      };
    }
  },
  getAccount: () =>
  {
    return {
      ok: true,
      status: 200,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      data: require('../fixtures/get-account.json'),
    };
  },
  updateAccount: () =>
  {
    return {
      ok: true,
    };
  },
  changePassword: ({currentPassword}) =>
  {
    if (currentPassword === 'valid-password')
    {
      return {
        ok: true,
      };
    }
    else
    {
      return {
        ok: false,
        data: 'Password error',
      };
    }
  },
};
