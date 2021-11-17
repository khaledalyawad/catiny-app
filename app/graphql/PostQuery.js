import GraphQL from "./GraphQL";


export default class PostQuery
{
  static allPost = () =>
  {
    const query = `
    {
      allPost
      {
        uuid
        content
        likesCount
        ${GraphQL.addInfo()}
      }
    }`
    return GraphQL.query(query);
  }

  post2IMPost(post)
  {

  }


}