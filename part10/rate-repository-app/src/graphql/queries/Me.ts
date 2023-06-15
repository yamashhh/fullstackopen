import { graphql } from "../../generated/gql";

export const MeDocument = graphql(`
  query Me {
    me {
      id
      username
    }
  }
`);
