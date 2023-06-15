import { graphql } from "../../generated/gql";

export const RepositoryItemFragment = graphql(`
  fragment RepositoryItem on Repository {
    id
    fullName
    language
    stargazersCount
    forksCount
    ratingAverage
    reviewCount
    description
    ownerAvatarUrl
  }
`);
