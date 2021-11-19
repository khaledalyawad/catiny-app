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
    return `
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
    }
    `
  }

  static withPageable(pageable)
  {
    if (!pageable)
      return "";
    const {page, size, sort} = pageable;
    if (page || size || sort)
      return `pageable: { ${page && "page: " + page},${size && "size: " + size},${sort && "sort: " + sort} }`
    else
      return "";
  }

  static onlyPageable(pageable)
  {
    return pageable ? `( ${GraphQL.withPageable(pageable)} )` : "";
  }
}