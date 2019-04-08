// apollo stuff
import ApolloClient from 'apollo-client';
import {ApolloLink, split} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';
import {InMemoryCache} from 'apollo-cache-inmemory';

const port = process.env.PORT || 4000;
const uri = `http://localhost:${port}/api`;
const ws = `ws://localhost:${port}/subs`;

const httpLink = new HttpLink({
  uri,
})
const wsLink = new WebSocketLink({
  uri: ws,
  options: {
    reconnect: true,
    connectionParams: {
      ctoken: localStorage.getItem('tto-token'),
    },
  },
});
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({headers = {}}) => {
    const token = localStorage.getItem('tto-token');
    if (token) {
      headers = {...headers, 'x-token': token};
    }
    return {headers};
  });
  return forward(operation);
});
const isSubcriptionOperation = ({query}) => {
  const {kind, operation} = getMainDefinition(query);
  return kind === 'OperationDefinition' && operation === 'subscription';
};
const svcLink = split(
  isSubcriptionOperation,
  wsLink,
  httpLink,
);
const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({message, locations, path}) => {
      console.log('-> Graphql error :\n', message);
      if (message === 'UNAUTHENTICATED') {
        localStorage.removeItem('tto-token');
        client.resetStore();
      }
    })
  }
  if (networkError) {
    console.log('-> Network error :\n', networkError);
    if (networkError.statusCode === 401) {
      localStorage.removeItem('tto-token');
      client.resetStore();
    }
  }
});
const link = ApolloLink.from([authLink, errorLink, svcLink])

const client = new ApolloClient({
  cache: new InMemoryCache().restore(window.__STATE__),
  link,
  ssrForceFetchDelay: 100,
  connectToDevTools: false, //apollographql dev tools
});

export default client