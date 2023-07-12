import { graphql } from "../../generated/gql";

export const PaginatedRepositoriesQueryDocument = graphql(`
  query PaginatedRepositories(
    $first: Int
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $after: String
  ) {
    repositories(
      first: $first
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
      after: $after
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
