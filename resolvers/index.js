import {GraphQLDateTime} from 'graphql-iso-date';

// resolvers
import postResolver from './post';
import userResolver from './user';

const customScalarResolver = {
  Date: GraphQLDateTime,
}

export default [
  customScalarResolver,
  postResolver,
  userResolver,
]