import { graphql } from "../../generated/gql";

export const CreateUserMutationDocument = graphql(`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
    }
  }
`);
