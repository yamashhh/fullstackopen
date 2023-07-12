import { graphql } from "../../generated/gql";

export const CreateReviewMutationDocument = graphql(`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      repositoryId
    }
  }
`);
