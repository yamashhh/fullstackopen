import { graphql } from "../../generated/gql";

export const MeQueryDocument = graphql(`
  query Me {
    me {
      id
      username
    }
  }
`);
