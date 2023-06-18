import { graphql } from "../../generated/gql";

export const RepositoryItemFragment = graphql(`
  fragment RepositoryItem on Repository {
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
    url
  }
`);
