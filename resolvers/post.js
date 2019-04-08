import {combineResolvers} from 'graphql-resolvers';
import chalk from 'chalk';
import {isAuthenticated} from './auth';

// publication - subscription
import pubsub, {EVENT} from '../subscription';

// cursor for pagination
const toCursorHash = string => Buffer.from(string).toString('base64');
const fromCursorHash = string => Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    posts: async (obj, {cursor, limit = 3}, {models}) => {
      const cursorSelector = cursor ? {createdAt: {$lt: fromCursorHash(cursor)}} : {};
      const postData = await models.Post.find(cursorSelector, null, {
        sort: {createdAt: -1},
        limit: limit + 1,
      });
      const hasNextPage = postData.length > limit;
      const edges = hasNextPage ? postData.slice(0, -1) : postData;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(edges[edges.length - 1].createdAt.toString()),
        },
      };
    },
    post: async (obj, {slug}, {models}) => {
      return await models.Post.findOne({slug});
    },
  },
  Mutation: {
    addPost: combineResolvers(
      isAuthenticated,
      async (obj, {title, content, slug}, {models}) => {
        const post = await models.Post.create({
          title,
          content,
          slug,
          createdAt: Date.now(),
        });
        pubsub.publish(EVENT.POST.CREATED, {
          posted: {post},
        });
        return post;
      }
    ),
    deletePost: combineResolvers(
      isAuthenticated,
      async (obj, {id}, {models}) => {
        const post = await models.Post.findById(id)

        if (post) {
          await post.remove();
          pubsub.publish(EVENT.POST.DELETED, {
            deleted: id,
          });
          console.log(
            chalk.red.bold('item deleted : ', post._id)
          );
          return true;
        } else {
          return false;
        }
      }
    ),
  },
  Subscription: {
    posted: {
      subscribe: () => pubsub.asyncIterator(EVENT.POST.CREATED),
    },
    deleted: {
      subscribe: () => pubsub.asyncIterator(EVENT.POST.DELETED),
    },
  },
}