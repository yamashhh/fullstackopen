import { graphql } from "../../generated/gql";

export const PaginatedRepositoriesQueryDocument = graphql(`
  query PaginatedRepositories($first: Int, $orderDirection: OrderDirection) {
    repositories(first: $first, orderDirection: $orderDirection) {
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
