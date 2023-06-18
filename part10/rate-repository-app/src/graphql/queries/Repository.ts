import { graphql } from "../../generated/gql";

export const RepositoryQueryDocument = graphql(`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryItem
    }
  }
`);
