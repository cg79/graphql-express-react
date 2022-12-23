import React from "react";
import Users from "./users";
const {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} = require("@apollo/client");

const client = new ApolloClient({
  uri: "http://localhost:4001/graphql",
  cache: new InMemoryCache(),
});

const Root = () => {
  return (
  <ApolloProvider client={client}>
    <Users></Users>
  </ApolloProvider>
  )
};

export default Root;
