import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  type NormalizedCacheObject,
} from "@apollo/client";
import Constants from "expo-constants";
const APOLLO_URI = Constants.manifest?.extra?.apolloUri;

if (APOLLO_URI == null) {
  throw new Error("Failed to load environment variable: apolloUri");
}

const httpLink = createHttpLink({
  uri: APOLLO_URI,
});

const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
