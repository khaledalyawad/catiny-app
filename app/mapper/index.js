import {UserUtils} from "../shared/util/user-utils";
import {imageUrl} from "../shared/util/image-tools-util";
import {staticUrl} from "../shared/util/url-utils";


export const post2PostIM = (post) =>
{
  const author = UserUtils.masterUser2user(post.info?.owner);
  const content = JSON.parse(post.content);
  const postText = content?.content;
  const images = content?.images?.map(url => ({mime: 'image/jpeg', url: imageUrl(url)}));
  const videos = content?.videos?.map(url => ({mime: 'video/mp4', url: staticUrl(url)}));
  const postMedia = images.concat(videos);
  return {
    author: {...author},
    authorID: post.info?.owner?.uuid,
    commentCount: post.commentsCount,
    createdAt: post.info?.createdDate,
    id: post.uuid,
    hashtags: [],
    location: 'Việt nam',
    postMedia,
    // postMedia: [
    //   {
    //     mime: 'image/jpeg',
    //     url: 'https://i.pinimg.com/originals/f0/15/d5/f015d58b2f4e5947180d23ac2d84fd2e.png',
    //   },
    // ],
    postText,
    reactions: {
      angry: 0,
      cry: 0,
      laugh: 0,
      like: 2,
      love: 3,
      sad: 0,
      surprised: 0,
    },
    reactionsCount: post.likesCount,
  };
}