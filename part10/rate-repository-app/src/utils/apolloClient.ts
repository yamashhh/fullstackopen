import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  type NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { relayStylePagination } from "@apollo/client/utilities";
import Constants from "expo-constants";
import type AuthStorage from "./authStorage";
const APOLLO_URI = Constants.manifest?.extra?.apolloUri;

if (APOLLO_URI == null) {
  throw new Error("Failed to load environment variable: apolloUri");
}

const httpLink = createHttpLink({
  uri: APOLLO_URI,
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
    Repository: {
      fields: {
        reviews: relayStylePagination(),
      },
    },
  },
});

const createApolloClient = (
  authStorage: AuthStorage
): ApolloClient<NormalizedCacheObject> => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      const authorizationHeader =
        accessToken === null ? "" : `Bearer ${accessToken}`;
      return {
        headers: {
          ...headers,
          authorization: authorizationHeader,
        },
      };
    } catch (error) {
      console.dir(error);
      return {
        headers,
      };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });
};

export default createApolloClient;
