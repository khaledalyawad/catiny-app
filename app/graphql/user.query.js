import GraphQL from "./GraphQL";

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
  return GraphQL.query(query);
}