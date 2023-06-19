import { graphql } from "../../generated/gql";

export const ReviewItemFragment = graphql(`
  fragment ReviewItem on Review {
    createdAt
    id
    rating
    text
    user {
      id
      username
    }
  }
`);
