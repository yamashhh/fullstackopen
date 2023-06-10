import { graphql } from "../../generated/gql";

export const PageInfoFragment = graphql(`
  fragment PageInfo on PageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
  }
`);
