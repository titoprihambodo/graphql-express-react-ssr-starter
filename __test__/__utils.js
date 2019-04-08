import {ApolloServer} from 'apollo-server-express';
import typeDefs from '../typeDefs';
import resolvers from '../resolvers';
import models from '../models';
import jwt from 'jsonwebtoken';
import config from '../config';

export const constructTestServer = (addContext = {}) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      models,
      ...addContext,
    },
  });
  return server;
};

export const whoami = async token => {
  if (token) {
    try {
      return await jwt.decode(token);
      // return await jwt.verify(token, config.secret);
    } catch (error) {
      console.log(`authentication failed, token problem or expired : ${error}`);
    }
  }
}

export const isTokenExpired = async token => {
  try {
    await jwt.verify(token, config.secret);
    return true;
  } catch (error) {
    console.log(`authentication failed, token problem or expired : ${error}`);
    return false;
  }
}