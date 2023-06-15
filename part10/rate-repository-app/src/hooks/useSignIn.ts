import {
  useApolloClient,
  useMutation,
  type MutationResult,
} from "@apollo/client";
import { useNavigate } from "react-router-native";
import {
  type AuthenticateInput,
  type AuthenticateMutation,
} from "../generated/gql/graphql";
import { AuthenticateDocument } from "../graphql/mutations/Authenticate";
import useAuthStorage from "./useAuthStorage";

const useSignIn = (): [typeof signIn, MutationResult<AuthenticateMutation>] => {
  const [mutate, result] = useMutation(AuthenticateDocument);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signIn = async (input: AuthenticateInput): Promise<void> => {
    const { data } = await mutate({
      variables: {
        credentials: input,
      },
    });
    if (authStorage == null || data?.authenticate?.accessToken == null) {
      throw new Error("Failed to login.");
    }
    await authStorage.setAccessToken(data.authenticate.accessToken);
    await apolloClient.resetStore();
    navigate("/");
  };

  return [signIn, result];
};

export default useSignIn;
