import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-native";
import useAuthStorage from "./useAuthStorage";

const useSignOut = (): { signOut: typeof signOut } => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signOut = async (): Promise<void> => {
    if (authStorage == null) {
      throw new Error("Failed to sign out.");
    }
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate("/");
  };

  return {
    signOut,
  };
};

export default useSignOut;
