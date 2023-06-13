import { graphql } from "../../generated/gql";

export const AuthenticateDocument = graphql(`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`);
