import { graphql } from "../../generated/gql";

export const PaginatedRepositoriesQueryDocument = graphql(`
  query PaginatedRepositories(
    $first: Int
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
  ) {
    repositories(
      first: $first
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...RepositoryItem
        }
        cursor
      }
      pageInfo {
        ...PageInfo
      }
      totalCount
    }
  }
`);
