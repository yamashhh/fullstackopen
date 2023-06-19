import { graphql } from "../../generated/gql";

export const AuthenticateMutationDocument = graphql(`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`);
