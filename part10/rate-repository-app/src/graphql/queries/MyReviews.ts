import { graphql } from "../../generated/gql";

export const MyReviewsQueryDocument = graphql(`
  query MyReviews {
    me {
      id
      reviews {
        totalCount
        pageInfo {
          ...PageInfo
        }
        edges {
          cursor
          node {
            ...ReviewItem
          }
        }
      }
    }
  }
`);
