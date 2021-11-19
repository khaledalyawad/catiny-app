import GraphQL from "./GraphQL";


export default class PostQuery
{
  static allPost = (pageable) =>
  {
    const query = `
    {
      allPost
      {
        uuid
        content
        likesCount
        commentsCount
        ${GraphQL.addInfo()}
      }
    }`
    return GraphQL.query(query);
  }

  static postIncludesComments = (postId, pageable) =>
  {
    const query = `
    {
      post(uuid: "${postId}")
      {
        uuid
        content
        commentsCount
        comments${GraphQL.onlyPageable(pageable)}
        {
          uuid
          content
          ${GraphQL.addInfo()}
        }
        ${GraphQL.addInfo()}
      }
    }
    `
    return GraphQL.query(query);
  }

  static postById(postId)
  {
    const query = `
    {
      post(uuid: "${postId}")
      {
        uuid
        content
        likesCount
        commentsCount
        ${GraphQL.addInfo()}
      }
    }
    `
    return GraphQL.query(query);
  }
}