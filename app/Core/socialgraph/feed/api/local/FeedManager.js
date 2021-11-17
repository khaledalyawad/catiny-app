/**
 * Implement These Methods If You Are Adding Your Own Custom Backend
 */

import {
  setCurrentUserFeedPosts,
  setDiscoverFeedPosts,
  setFeedListenerDidSubscribe,
  setFeedPostReactions,
  setMainFeedPosts,
  setMainStories
} from '../../redux';
import {postAPIManager, storyAPIManager} from "../";

export default class FeedManager
{
  constructor(reduxStore, currentUserID)
  {
    this.reduxStore = reduxStore;
    this.currentUserID = currentUserID;
    this.subscribeIfNeeded();
  }

  subscribeIfNeeded = () =>
  {
    // this.reduxStore.dispatch(setMainStories(mockStoriesData));
    // this.reduxStore.dispatch(setDiscoverFeedPosts(mockPostsData));
    // this.reduxStore.dispatch(setFeedPostReactions([]));
    // this.reduxStore.dispatch(setCurrentUserFeedPosts(mockPostsData));
    // this.reduxStore.dispatch(setMainFeedPosts(mockPostsData));

    const state = this.reduxStore.getState();
    if (!state.feed.didSubscribeToMainFeed)
    {
      this.reduxStore.dispatch(setFeedListenerDidSubscribe());
      this.feedUnsubscribe = postAPIManager?.subscribeToMainFeedPosts(this.currentUserID, this.onFeedPostsUpdate);
      this.storiesUnsubscribe = storyAPIManager?.subscribeToStoriesFeed(this.currentUserID, this.onStoriesUpdate);

      this.subscribeUserFeedRelatedActions();

      this.discoverUnsubscribe = postAPIManager?.subscribeToDiscoverFeedPosts(this.onDiscoverPostsUpdate);
      this.currentProfileFeedUnsubscribe = postAPIManager?.subscribeToProfileFeedPosts(this.currentUserID, this.onProfileFeedUpdate);
    }
  };
  unsubscribe = () =>
  {
  };

  onFeedPostsUpdate = (posts) =>
  {
    // this.posts = posts;
    // this.hydratePostsIfNeeded();
    this.reduxStore.dispatch(setMainFeedPosts(posts));
  };

  onStoriesUpdate = (stories) =>
  {
    this.reduxStore.dispatch(setMainStories(stories));
  };

  subscribeUserFeedRelatedActions = () =>
  {
    // this.abusesUnsubscribe = reportingManager?.unsubscribeAbuseDB(this.currentUserID, this.onAbusesUpdate);
    //
    // this.reactionsUnsubscribe = commentAPIManager?.subscribeToUserReactions(this.currentUserID, this.onReactionsUpdate);
    this.reduxStore.dispatch(setFeedPostReactions([]));
  };

  onDiscoverPostsUpdate = (posts) =>
  {
    // this.discoverPosts = posts;
    // this.hydratePostsIfNeeded();
    this.reduxStore.dispatch(setDiscoverFeedPosts(posts));
  };

  onProfileFeedUpdate = (posts) =>
  {
    this.reduxStore.dispatch(setCurrentUserFeedPosts(posts));
  };
}
