import {
  useApolloClient,
  useMutation,
  type MutationResult,
} from "@apollo/client";
import { Alert } from "react-native";
import { useNavigate } from "react-router-native";
import {
  type AuthenticateInput,
  type AuthenticateMutation,
} from "../generated/gql/graphql";
import { AuthenticateMutationDocument } from "../graphql/mutations/Authenticate";
import useAuthStorage from "./useAuthStorage";

const useSignIn = (): [typeof signIn, MutationResult<AuthenticateMutation>] => {
  const [mutate, result] = useMutation(AuthenticateMutationDocument);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signIn = async (input: AuthenticateInput): Promise<void> => {
    try {
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
    } catch (error) {
      Alert.alert(
        error instanceof Error
          ? error.message
          : "An unknown error occurred during sign-in"
      );
    }
  };

  return [signIn, result];
};

export default useSignIn;
