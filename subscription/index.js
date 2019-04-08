import {PubSub} from 'apollo-server-express';
import POST_EVENT from './post';

export const EVENT = {
  POST: POST_EVENT,
}

export default new PubSub();