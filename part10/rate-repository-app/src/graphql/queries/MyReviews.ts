import { graphql } from "../../generated/gql";

export const MyReviewsDocument = graphql(`
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
