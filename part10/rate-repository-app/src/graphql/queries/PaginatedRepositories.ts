import { graphql } from "../../generated/gql";

export const PaginatedRepositoriesQueryDocument = graphql(`
  query PaginatedRepositories(
    $first: Int
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
  ) {
    repositories(
      first: $first
      orderDirection: $orderDirection
      orderBy: $orderBy
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
