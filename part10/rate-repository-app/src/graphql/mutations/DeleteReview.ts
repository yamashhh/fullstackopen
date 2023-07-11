import { graphql } from "../../generated/gql";

export const DeleteReviewMutationDocument = graphql(`
  mutation DeleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`);
