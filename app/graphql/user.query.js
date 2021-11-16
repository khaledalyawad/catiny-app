import API from "../shared/services/api";

export function getMasterUser(referenceUserId)
{
  const query = `
  {
    masterUser(uuid: "${referenceUserId}")
    {
      uuid
      fullName
      avatar
      nickname
      user
      {
        firstName
        lastName
        email
        langKey
      }
    }
  }
  `
  return API.graphqlQuery(query).then(response => response.data);
}