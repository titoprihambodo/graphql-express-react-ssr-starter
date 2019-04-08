import {ForbiddenError} from 'apollo-server-express';
import {skip} from 'graphql-resolvers';

export const isAuthenticated = (obj, args, {me}) => (
  me ? skip : new ForbiddenError('Non authenticated user.')
);