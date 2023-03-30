import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LOCAL_STORAGE_KEY } from "./constants";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { Kind, OperationTypeNode } from "graphql";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY);
  return {
    headers: {
      ...headers,
      authorization: token != null ? `bearer ${token}` : null,
    },
  };
});
const httpLink = new HttpLink({
  uri: "http://localhost:4000",
});
const wsLink = new GraphQLWsLink(createClient({ url: "ws://localhost:4000" }));
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === Kind.OPERATION_DEFINITION &&
      definition.operation === OperationTypeNode.SUBSCRIPTION
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
