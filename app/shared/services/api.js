// a library to wrap and simplify api calls
import apisauce from 'apisauce';

import AppConfig from '../../config/app-config';

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) =>
{
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 10000,
  });

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth);
  const removeAuthToken = () => api.deleteHeader('Authorization');
  const login = (userAuth) => api.post('api/authenticate', userAuth);
  const register = (user) => api.post('api/register', user);
  const forgotPassword = (data) =>
    api.post('api/account/reset-password/init', data, {
      headers: {'Content-Type': 'text/plain', Accept: 'application/json, text/plain, */*'},
    });

  const getAccount = () => api.get('api/account');
  const updateAccount = (account) => api.post('api/account', account);
  const changePassword = (currentPassword, newPassword) =>
    api.post(
      'api/account/change-password',
      {currentPassword, newPassword},
      {headers: {'Content-Type': 'application/json', Accept: 'application/json, text/plain, */*'}},
    );

  const getUser = (userId) => api.get('api/users/' + userId);
  const getAllUsers = (options) => api.get('api/users', options);
  const createUser = (user) => api.post('api/users', user);
  const updateUser = (user) => api.put('api/users', user);
  const deleteUser = (userId) => api.delete('api/users/' + userId);

  const getMessageGroup = (messageGroupId) => api.get('api/message-groups/' + messageGroupId);
  const getAllMessageGroups = (options) => api.get('api/message-groups', options);
  const createMessageGroup = (messageGroup) => api.post('api/message-groups', messageGroup);
  const updateMessageGroup = (messageGroup) => api.put(`api/message-groups/${messageGroup.id}`, messageGroup);
  const deleteMessageGroup = (messageGroupId) => api.delete('api/message-groups/' + messageGroupId);
  const searchMessageGroups = (query) => api.get('api/_search/message-groups', {query: query});

  const getMessageContent = (messageContentId) => api.get('api/message-contents/' + messageContentId);
  const getAllMessageContents = (options) => api.get('api/message-contents', options);
  const createMessageContent = (messageContent) => api.post('api/message-contents', messageContent);
  const updateMessageContent = (messageContent) => api.put(`api/message-contents/${messageContent.id}`, messageContent);
  const deleteMessageContent = (messageContentId) => api.delete('api/message-contents/' + messageContentId);
  const searchMessageContents = (query) => api.get('api/_search/message-contents', {query: query});

  const getHanhChinhVN = (hanhChinhVNId) => api.get('api/hanh-chinh-vns/' + hanhChinhVNId);
  const getAllHanhChinhVNS = (options) => api.get('api/hanh-chinh-vns', options);
  const createHanhChinhVN = (hanhChinhVN) => api.post('api/hanh-chinh-vns', hanhChinhVN);
  const updateHanhChinhVN = (hanhChinhVN) => api.put(`api/hanh-chinh-vns/${hanhChinhVN.id}`, hanhChinhVN);
  const deleteHanhChinhVN = (hanhChinhVNId) => api.delete('api/hanh-chinh-vns/' + hanhChinhVNId);
  const searchHanhChinhVNS = (query) => api.get('api/_search/hanh-chinh-vns', {query: query});

  const getMasterUser = (masterUserId) => api.get('api/master-users/' + masterUserId);
  const getAllMasterUsers = (options) => api.get('api/master-users', options);
  const createMasterUser = (masterUser) => api.post('api/master-users', masterUser);
  const updateMasterUser = (masterUser) => api.put(`api/master-users/${masterUser.id}`, masterUser);
  const deleteMasterUser = (masterUserId) => api.delete('api/master-users/' + masterUserId);
  const searchMasterUsers = (query) => api.get('api/_search/master-users', {query: query});

  const getUserProfile = (userProfileId) => api.get('api/user-profiles/' + userProfileId);
  const getAllUserProfiles = (options) => api.get('api/user-profiles', options);
  const createUserProfile = (userProfile) => api.post('api/user-profiles', userProfile);
  const updateUserProfile = (userProfile) => api.put(`api/user-profiles/${userProfile.id}`, userProfile);
  const deleteUserProfile = (userProfileId) => api.delete('api/user-profiles/' + userProfileId);
  const searchUserProfiles = (query) => api.get('api/_search/user-profiles', {query: query});

  const getAccountStatus = (accountStatusId) => api.get('api/account-statuses/' + accountStatusId);
  const getAllAccountStatuses = (options) => api.get('api/account-statuses', options);
  const createAccountStatus = (accountStatus) => api.post('api/account-statuses', accountStatus);
  const updateAccountStatus = (accountStatus) => api.put(`api/account-statuses/${accountStatus.id}`, accountStatus);
  const deleteAccountStatus = (accountStatusId) => api.delete('api/account-statuses/' + accountStatusId);
  const searchAccountStatuses = (query) => api.get('api/_search/account-statuses', {query: query});

  const getDeviceStatus = (deviceStatusId) => api.get('api/device-statuses/' + deviceStatusId);
  const getAllDeviceStatuses = (options) => api.get('api/device-statuses', options);
  const createDeviceStatus = (deviceStatus) => api.post('api/device-statuses', deviceStatus);
  const updateDeviceStatus = (deviceStatus) => api.put(`api/device-statuses/${deviceStatus.id}`, deviceStatus);
  const deleteDeviceStatus = (deviceStatusId) => api.delete('api/device-statuses/' + deviceStatusId);
  const searchDeviceStatuses = (query) => api.get('api/_search/device-statuses', {query: query});

  const getFriend = (friendId) => api.get('api/friends/' + friendId);
  const getAllFriends = (options) => api.get('api/friends', options);
  const createFriend = (friend) => api.post('api/friends', friend);
  const updateFriend = (friend) => api.put(`api/friends/${friend.id}`, friend);
  const deleteFriend = (friendId) => api.delete('api/friends/' + friendId);
  const searchFriends = (query) => api.get('api/_search/friends', {query: query});

  const getFollowUser = (followUserId) => api.get('api/follow-users/' + followUserId);
  const getAllFollowUsers = (options) => api.get('api/follow-users', options);
  const createFollowUser = (followUser) => api.post('api/follow-users', followUser);
  const updateFollowUser = (followUser) => api.put(`api/follow-users/${followUser.id}`, followUser);
  const deleteFollowUser = (followUserId) => api.delete('api/follow-users/' + followUserId);
  const searchFollowUsers = (query) => api.get('api/_search/follow-users', {query: query});

  const getFollowGroup = (followGroupId) => api.get('api/follow-groups/' + followGroupId);
  const getAllFollowGroups = (options) => api.get('api/follow-groups', options);
  const createFollowGroup = (followGroup) => api.post('api/follow-groups', followGroup);
  const updateFollowGroup = (followGroup) => api.put(`api/follow-groups/${followGroup.id}`, followGroup);
  const deleteFollowGroup = (followGroupId) => api.delete('api/follow-groups/' + followGroupId);
  const searchFollowGroups = (query) => api.get('api/_search/follow-groups', {query: query});

  const getFollowPage = (followPageId) => api.get('api/follow-pages/' + followPageId);
  const getAllFollowPages = (options) => api.get('api/follow-pages', options);
  const createFollowPage = (followPage) => api.post('api/follow-pages', followPage);
  const updateFollowPage = (followPage) => api.put(`api/follow-pages/${followPage.id}`, followPage);
  const deleteFollowPage = (followPageId) => api.delete('api/follow-pages/' + followPageId);
  const searchFollowPages = (query) => api.get('api/_search/follow-pages', {query: query});

  const getFileInfo = (fileInfoId) => api.get('api/file-infos/' + fileInfoId);
  const getAllFileInfos = (options) => api.get('api/file-infos', options);
  const createFileInfo = (fileInfo) => api.post('api/file-infos', fileInfo);
  const updateFileInfo = (fileInfo) => api.put(`api/file-infos/${fileInfo.id}`, fileInfo);
  const deleteFileInfo = (fileInfoId) => api.delete('api/file-infos/' + fileInfoId);
  const searchFileInfos = (query) => api.get('api/_search/file-infos', {query: query});

  const getPagePost = (pagePostId) => api.get('api/page-posts/' + pagePostId);
  const getAllPagePosts = (options) => api.get('api/page-posts', options);
  const createPagePost = (pagePost) => api.post('api/page-posts', pagePost);
  const updatePagePost = (pagePost) => api.put(`api/page-posts/${pagePost.id}`, pagePost);
  const deletePagePost = (pagePostId) => api.delete('api/page-posts/' + pagePostId);
  const searchPagePosts = (query) => api.get('api/_search/page-posts', {query: query});

  const getPageProfile = (pageProfileId) => api.get('api/page-profiles/' + pageProfileId);
  const getAllPageProfiles = (options) => api.get('api/page-profiles', options);
  const createPageProfile = (pageProfile) => api.post('api/page-profiles', pageProfile);
  const updatePageProfile = (pageProfile) => api.put(`api/page-profiles/${pageProfile.id}`, pageProfile);
  const deletePageProfile = (pageProfileId) => api.delete('api/page-profiles/' + pageProfileId);
  const searchPageProfiles = (query) => api.get('api/_search/page-profiles', {query: query});

  const getGroupPost = (groupPostId) => api.get('api/group-posts/' + groupPostId);
  const getAllGroupPosts = (options) => api.get('api/group-posts', options);
  const createGroupPost = (groupPost) => api.post('api/group-posts', groupPost);
  const updateGroupPost = (groupPost) => api.put(`api/group-posts/${groupPost.id}`, groupPost);
  const deleteGroupPost = (groupPostId) => api.delete('api/group-posts/' + groupPostId);
  const searchGroupPosts = (query) => api.get('api/_search/group-posts', {query: query});

  const getPost = (postId) => api.get('api/posts/' + postId);
  const getAllPosts = (options) => api.get('api/posts', options);
  const createPost = (post) => api.post('api/posts', post);
  const updatePost = (post) => api.put(`api/posts/${post.id}`, post);
  const deletePost = (postId) => api.delete('api/posts/' + postId);
  const searchPosts = (query) => api.get('api/_search/posts', {query: query});

  const getPostComment = (postCommentId) => api.get('api/post-comments/' + postCommentId);
  const getAllPostComments = (options) => api.get('api/post-comments', options);
  const createPostComment = (postComment) => api.post('api/post-comments', postComment);
  const updatePostComment = (postComment) => api.put(`api/post-comments/${postComment.id}`, postComment);
  const deletePostComment = (postCommentId) => api.delete('api/post-comments/' + postCommentId);
  const searchPostComments = (query) => api.get('api/_search/post-comments', {query: query});

  const getPostLike = (postLikeId) => api.get('api/post-likes/' + postLikeId);
  const getAllPostLikes = (options) => api.get('api/post-likes', options);
  const createPostLike = (postLike) => api.post('api/post-likes', postLike);
  const updatePostLike = (postLike) => api.put(`api/post-likes/${postLike.id}`, postLike);
  const deletePostLike = (postLikeId) => api.delete('api/post-likes/' + postLikeId);
  const searchPostLikes = (query) => api.get('api/_search/post-likes', {query: query});

  const getGroupProfile = (groupProfileId) => api.get('api/group-profiles/' + groupProfileId);
  const getAllGroupProfiles = (options) => api.get('api/group-profiles', options);
  const createGroupProfile = (groupProfile) => api.post('api/group-profiles', groupProfile);
  const updateGroupProfile = (groupProfile) => api.put(`api/group-profiles/${groupProfile.id}`, groupProfile);
  const deleteGroupProfile = (groupProfileId) => api.delete('api/group-profiles/' + groupProfileId);
  const searchGroupProfiles = (query) => api.get('api/_search/group-profiles', {query: query});

  const getNewsFeed = (newsFeedId) => api.get('api/news-feeds/' + newsFeedId);
  const getAllNewsFeeds = (options) => api.get('api/news-feeds', options);
  const createNewsFeed = (newsFeed) => api.post('api/news-feeds', newsFeed);
  const updateNewsFeed = (newsFeed) => api.put(`api/news-feeds/${newsFeed.id}`, newsFeed);
  const deleteNewsFeed = (newsFeedId) => api.delete('api/news-feeds/' + newsFeedId);
  const searchNewsFeeds = (query) => api.get('api/_search/news-feeds', {query: query});

  const getRankUser = (rankUserId) => api.get('api/rank-users/' + rankUserId);
  const getAllRankUsers = (options) => api.get('api/rank-users', options);
  const createRankUser = (rankUser) => api.post('api/rank-users', rankUser);
  const updateRankUser = (rankUser) => api.put(`api/rank-users/${rankUser.id}`, rankUser);
  const deleteRankUser = (rankUserId) => api.delete('api/rank-users/' + rankUserId);
  const searchRankUsers = (query) => api.get('api/_search/rank-users', {query: query});

  const getRankGroup = (rankGroupId) => api.get('api/rank-groups/' + rankGroupId);
  const getAllRankGroups = (options) => api.get('api/rank-groups', options);
  const createRankGroup = (rankGroup) => api.post('api/rank-groups', rankGroup);
  const updateRankGroup = (rankGroup) => api.put(`api/rank-groups/${rankGroup.id}`, rankGroup);
  const deleteRankGroup = (rankGroupId) => api.delete('api/rank-groups/' + rankGroupId);
  const searchRankGroups = (query) => api.get('api/_search/rank-groups', {query: query});

  const getNotification = (notificationId) => api.get('api/notifications/' + notificationId);
  const getAllNotifications = (options) => api.get('api/notifications', options);
  const createNotification = (notification) => api.post('api/notifications', notification);
  const updateNotification = (notification) => api.put(`api/notifications/${notification.id}`, notification);
  const deleteNotification = (notificationId) => api.delete('api/notifications/' + notificationId);
  const searchNotifications = (query) => api.get('api/_search/notifications', {query: query});

  const getAlbum = (albumId) => api.get('api/albums/' + albumId);
  const getAllAlbums = (options) => api.get('api/albums', options);
  const createAlbum = (album) => api.post('api/albums', album);
  const updateAlbum = (album) => api.put(`api/albums/${album.id}`, album);
  const deleteAlbum = (albumId) => api.delete('api/albums/' + albumId);
  const searchAlbums = (query) => api.get('api/_search/albums', {query: query});

  const getVideo = (videoId) => api.get('api/videos/' + videoId);
  const getAllVideos = (options) => api.get('api/videos', options);
  const createVideo = (video) => api.post('api/videos', video);
  const updateVideo = (video) => api.put(`api/videos/${video.id}`, video);
  const deleteVideo = (videoId) => api.delete('api/videos/' + videoId);
  const searchVideos = (query) => api.get('api/_search/videos', {query: query});

  const getImage = (imageId) => api.get('api/images/' + imageId);
  const getAllImages = (options) => api.get('api/images', options);
  const createImage = (image) => api.post('api/images', image);
  const updateImage = (image) => api.put(`api/images/${image.id}`, image);
  const deleteImage = (imageId) => api.delete('api/images/' + imageId);
  const searchImages = (query) => api.get('api/_search/images', {query: query});

  const getVideoStream = (videoStreamId) => api.get('api/video-streams/' + videoStreamId);
  const getAllVideoStreams = (options) => api.get('api/video-streams', options);
  const createVideoStream = (videoStream) => api.post('api/video-streams', videoStream);
  const updateVideoStream = (videoStream) => api.put(`api/video-streams/${videoStream.id}`, videoStream);
  const deleteVideoStream = (videoStreamId) => api.delete('api/video-streams/' + videoStreamId);
  const searchVideoStreams = (query) => api.get('api/_search/video-streams', {query: query});

  const getVideoLiveStreamBuffer = (videoLiveStreamBufferId) => api.get('api/video-live-stream-buffers/' + videoLiveStreamBufferId);
  const getAllVideoLiveStreamBuffers = (options) => api.get('api/video-live-stream-buffers', options);
  const createVideoLiveStreamBuffer = (videoLiveStreamBuffer) => api.post('api/video-live-stream-buffers', videoLiveStreamBuffer);
  const updateVideoLiveStreamBuffer = (videoLiveStreamBuffer) =>
    api.put(`api/video-live-stream-buffers/${videoLiveStreamBuffer.id}`, videoLiveStreamBuffer);
  const deleteVideoLiveStreamBuffer = (videoLiveStreamBufferId) => api.delete('api/video-live-stream-buffers/' + videoLiveStreamBufferId);
  const searchVideoLiveStreamBuffers = (query) => api.get('api/_search/video-live-stream-buffers', {query: query});

  const getTopicInterest = (topicInterestId) => api.get('api/topic-interests/' + topicInterestId);
  const getAllTopicInterests = (options) => api.get('api/topic-interests', options);
  const createTopicInterest = (topicInterest) => api.post('api/topic-interests', topicInterest);
  const updateTopicInterest = (topicInterest) => api.put(`api/topic-interests/${topicInterest.id}`, topicInterest);
  const deleteTopicInterest = (topicInterestId) => api.delete('api/topic-interests/' + topicInterestId);
  const searchTopicInterests = (query) => api.get('api/_search/topic-interests', {query: query});

  const getTodoList = (todoListId) => api.get('api/todo-lists/' + todoListId);
  const getAllTodoLists = (options) => api.get('api/todo-lists', options);
  const createTodoList = (todoList) => api.post('api/todo-lists', todoList);
  const updateTodoList = (todoList) => api.put(`api/todo-lists/${todoList.id}`, todoList);
  const deleteTodoList = (todoListId) => api.delete('api/todo-lists/' + todoListId);
  const searchTodoLists = (query) => api.get('api/_search/todo-lists', {query: query});

  const getEvent = (eventId) => api.get('api/events/' + eventId);
  const getAllEvents = (options) => api.get('api/events', options);
  const createEvent = (event) => api.post('api/events', event);
  const updateEvent = (event) => api.put(`api/events/${event.id}`, event);
  const deleteEvent = (eventId) => api.delete('api/events/' + eventId);
  const searchEvents = (query) => api.get('api/_search/events', {query: query});

  const getBaseInfo = (baseInfoId) => api.get('api/base-infos/' + baseInfoId);
  const getAllBaseInfos = (options) => api.get('api/base-infos', options);
  const createBaseInfo = (baseInfo) => api.post('api/base-infos', baseInfo);
  const updateBaseInfo = (baseInfo) => api.put(`api/base-infos/${baseInfo.id}`, baseInfo);
  const deleteBaseInfo = (baseInfoId) => api.delete('api/base-infos/' + baseInfoId);
  const searchBaseInfos = (query) => api.get('api/_search/base-infos', {query: query});

  const getPermission = (permissionId) => api.get('api/permissions/' + permissionId);
  const getAllPermissions = (options) => api.get('api/permissions', options);
  const createPermission = (permission) => api.post('api/permissions', permission);
  const updatePermission = (permission) => api.put(`api/permissions/${permission.id}`, permission);
  const deletePermission = (permissionId) => api.delete('api/permissions/' + permissionId);
  const searchPermissions = (query) => api.get('api/_search/permissions', {query: query});

  const getClassInfo = (classInfoId) => api.get('api/class-infos/' + classInfoId);
  const getAllClassInfos = (options) => api.get('api/class-infos', options);
  const createClassInfo = (classInfo) => api.post('api/class-infos', classInfo);
  const updateClassInfo = (classInfo) => api.put(`api/class-infos/${classInfo.id}`, classInfo);
  const deleteClassInfo = (classInfoId) => api.delete('api/class-infos/' + classInfoId);
  const searchClassInfos = (query) => api.get('api/_search/class-infos', {query: query});

  const getHistoryUpdate = (historyUpdateId) => api.get('api/history-updates/' + historyUpdateId);
  const getAllHistoryUpdates = (options) => api.get('api/history-updates', options);
  const createHistoryUpdate = (historyUpdate) => api.post('api/history-updates', historyUpdate);
  const updateHistoryUpdate = (historyUpdate) => api.put(`api/history-updates/${historyUpdate.id}`, historyUpdate);
  const deleteHistoryUpdate = (historyUpdateId) => api.delete('api/history-updates/' + historyUpdateId);
  const searchHistoryUpdates = (query) => api.get('api/_search/history-updates', {query: query});
  // jhipster-react-native-api-method-needle
  const graphqlQuery = (query) =>
  {
    return new Promise((resolve, reject) =>
    {
      api.post('/graphql', {query}, {headers: {'Content-Type': 'application/json'}})
        .then(response => response.data.errors ?
          reject(response.data) :
          resolve(response.data));
    })
  };
  const getCurrentMasterUser = () => api.get('/api/o/users');
  const uploadComment = (content, postId, parentId) =>
  {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("postId", postId);
    parentId && formData.append("parentId", parentId);
    return api.post('api/o/comments', formData);
  }
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    createUser,
    updateUser,
    getAllUsers,
    getUser,
    deleteUser,

    createMessageGroup,
    updateMessageGroup,
    getAllMessageGroups,
    getMessageGroup,
    deleteMessageGroup,
    searchMessageGroups,

    createMessageContent,
    updateMessageContent,
    getAllMessageContents,
    getMessageContent,
    deleteMessageContent,
    searchMessageContents,

    createHanhChinhVN,
    updateHanhChinhVN,
    getAllHanhChinhVNS,
    getHanhChinhVN,
    deleteHanhChinhVN,
    searchHanhChinhVNS,

    createMasterUser,
    updateMasterUser,
    getAllMasterUsers,
    getMasterUser,
    deleteMasterUser,
    searchMasterUsers,

    createUserProfile,
    updateUserProfile,
    getAllUserProfiles,
    getUserProfile,
    deleteUserProfile,
    searchUserProfiles,

    createAccountStatus,
    updateAccountStatus,
    getAllAccountStatuses,
    getAccountStatus,
    deleteAccountStatus,
    searchAccountStatuses,

    createDeviceStatus,
    updateDeviceStatus,
    getAllDeviceStatuses,
    getDeviceStatus,
    deleteDeviceStatus,
    searchDeviceStatuses,

    createFriend,
    updateFriend,
    getAllFriends,
    getFriend,
    deleteFriend,
    searchFriends,

    createFollowUser,
    updateFollowUser,
    getAllFollowUsers,
    getFollowUser,
    deleteFollowUser,
    searchFollowUsers,

    createFollowGroup,
    updateFollowGroup,
    getAllFollowGroups,
    getFollowGroup,
    deleteFollowGroup,
    searchFollowGroups,

    createFollowPage,
    updateFollowPage,
    getAllFollowPages,
    getFollowPage,
    deleteFollowPage,
    searchFollowPages,

    createFileInfo,
    updateFileInfo,
    getAllFileInfos,
    getFileInfo,
    deleteFileInfo,
    searchFileInfos,

    createPagePost,
    updatePagePost,
    getAllPagePosts,
    getPagePost,
    deletePagePost,
    searchPagePosts,

    createPageProfile,
    updatePageProfile,
    getAllPageProfiles,
    getPageProfile,
    deletePageProfile,
    searchPageProfiles,

    createGroupPost,
    updateGroupPost,
    getAllGroupPosts,
    getGroupPost,
    deleteGroupPost,
    searchGroupPosts,

    createPost,
    updatePost,
    getAllPosts,
    getPost,
    deletePost,
    searchPosts,

    createPostComment,
    updatePostComment,
    getAllPostComments,
    getPostComment,
    deletePostComment,
    searchPostComments,

    createPostLike,
    updatePostLike,
    getAllPostLikes,
    getPostLike,
    deletePostLike,
    searchPostLikes,

    createGroupProfile,
    updateGroupProfile,
    getAllGroupProfiles,
    getGroupProfile,
    deleteGroupProfile,
    searchGroupProfiles,

    createNewsFeed,
    updateNewsFeed,
    getAllNewsFeeds,
    getNewsFeed,
    deleteNewsFeed,
    searchNewsFeeds,

    createRankUser,
    updateRankUser,
    getAllRankUsers,
    getRankUser,
    deleteRankUser,
    searchRankUsers,

    createRankGroup,
    updateRankGroup,
    getAllRankGroups,
    getRankGroup,
    deleteRankGroup,
    searchRankGroups,

    createNotification,
    updateNotification,
    getAllNotifications,
    getNotification,
    deleteNotification,
    searchNotifications,

    createAlbum,
    updateAlbum,
    getAllAlbums,
    getAlbum,
    deleteAlbum,
    searchAlbums,

    createVideo,
    updateVideo,
    getAllVideos,
    getVideo,
    deleteVideo,
    searchVideos,

    createImage,
    updateImage,
    getAllImages,
    getImage,
    deleteImage,
    searchImages,

    createVideoStream,
    updateVideoStream,
    getAllVideoStreams,
    getVideoStream,
    deleteVideoStream,
    searchVideoStreams,

    createVideoLiveStreamBuffer,
    updateVideoLiveStreamBuffer,
    getAllVideoLiveStreamBuffers,
    getVideoLiveStreamBuffer,
    deleteVideoLiveStreamBuffer,
    searchVideoLiveStreamBuffers,

    createTopicInterest,
    updateTopicInterest,
    getAllTopicInterests,
    getTopicInterest,
    deleteTopicInterest,
    searchTopicInterests,

    createTodoList,
    updateTodoList,
    getAllTodoLists,
    getTodoList,
    deleteTodoList,
    searchTodoLists,

    createEvent,
    updateEvent,
    getAllEvents,
    getEvent,
    deleteEvent,
    searchEvents,

    createBaseInfo,
    updateBaseInfo,
    getAllBaseInfos,
    getBaseInfo,
    deleteBaseInfo,
    searchBaseInfos,

    createPermission,
    updatePermission,
    getAllPermissions,
    getPermission,
    deletePermission,
    searchPermissions,

    createClassInfo,
    updateClassInfo,
    getAllClassInfos,
    getClassInfo,
    deleteClassInfo,
    searchClassInfos,

    createHistoryUpdate,
    updateHistoryUpdate,
    getAllHistoryUpdates,
    getHistoryUpdate,
    deleteHistoryUpdate,
    searchHistoryUpdates,
    // jhipster-react-native-api-export-needle
    setAuthToken,
    removeAuthToken,
    login,
    register,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword,
    graphqlQuery,
    getCurrentMasterUser,
    uploadComment,
  };
};

// let's return back our create method as the default.
export default {
  create,
};
