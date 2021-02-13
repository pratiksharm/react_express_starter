import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql' || "https://journaling-iterate.herokuapp.com/graphql",
  cache: new InMemoryCache()
});

export {client};