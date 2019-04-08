import {gql} from 'apollo-server-express';

import post from './post';
import user from './user';

const mainSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [
  mainSchema,
  post,
  user,
];