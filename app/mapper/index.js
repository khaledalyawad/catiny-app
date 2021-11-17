import {UserUtils} from "../shared/util/user-utils";
import {imageUrl} from "../shared/util/image-tools-util";
import AppConfig from "../config/app-config"


export const post2PostIM = (post) =>
{
  const author = UserUtils.masterUser2user(post.info.owner);
  const content = JSON.parse(post.content);
  const postText = content?.content;
  const images = content?.images?.map(url =>
  {
    const ru = imageUrl(url);
    const staticUrl = (ru.includes("http://") || ru.includes("https://"))
      ? ru
      : (AppConfig.apiUrl + ru);

    return ({mime: 'image/jpeg', url: staticUrl})
  });
  // const videos = content?.videos?.map(url => ({mime:'video/mp4',url}));
  const postMedia = images;
  return {
    author: {...author},
    authorID: post.info?.owner?.uuid,
    commentCount: 0,
    createdAt: post.info?.createdDate,
    id: post.uuid,
    hashtags: [],
    location: 'Miami, FL.',
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