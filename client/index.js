import React from 'react';
import {hydrate} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {ApolloProvider} from 'react-apollo';

import client from './apollo';
import App from './app';

const Tto = () => (
  <ApolloProvider client={client}>
    <Router>
      <App />
    </ Router>
  </ ApolloProvider>
)

hydrate(<Tto />, document.getElementById('root'))

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept();
}