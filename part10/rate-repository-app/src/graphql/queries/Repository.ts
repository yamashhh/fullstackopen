import { graphql } from "../../generated/gql";

export const RepositoryQueryDocument = graphql(`
  query Repository($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...RepositoryItem
      reviews(first: $first, after: $after) {
        edges {
          node {
            ...ReviewItem
          }
        }
        pageInfo {
          ...PageInfo
        }
        totalCount
      }
    }
  }
`);
