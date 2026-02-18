"use client";

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4500/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : "",
    },
  };
});

let clientInstance: ApolloClient<unknown> | null = null;

function createApolloClient() {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getAllLeagues: {
              keyArgs: false,
              merge(existing = [], incoming) {
                return incoming ?? existing;
              },
            },
            getLeague: {
              keyArgs: ["input"],
            },
          },
        },
        League: {
          keyFields: ["id"],
        },
      },
    }),
    defaultOptions: {
      watchQuery: {
        errorPolicy: "all",
      },
      query: {
        errorPolicy: "all",
      },
    },
    ssrMode: false,
  });
}

export function getApolloClient() {
  if (typeof window === "undefined") {
    throw new Error("Apollo Client should only be created on the client side");
  }

  if (!clientInstance) {
    clientInstance = createApolloClient();
  }

  return clientInstance;
}
