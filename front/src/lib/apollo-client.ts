import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4500/graphql", // Remplacez par l'URL de votre API GraphQL
});

const authLink = setContext((_, { headers }) => {
  // Récupérer le token d'authentification si nécessaire
  // const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
  },
});
