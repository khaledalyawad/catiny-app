import API from "../shared/services";

export default class GraphQL
{
  static query(query)
  {
    return API.graphqlQuery(query)
      .then(response => response.data)
      .catch(error =>
      {
        console.error("server error , details: " + error);
        return error;
      });
  }

  static addInfo()
  {
    return `\n
    info
    {
      createdDate
      modifiedDate
      notes
      owner
      {
        uuid
        avatar
        fullName
        nickname
        user
        {
          firstName
          lastName
          email
        }
      }
    }\n
    `

  }
}