import express from 'express';
import path from 'path';
import compression from 'compression';
import config, {isDev, isProd} from './config';
import chalk from 'chalk';
import cors from 'cors';
import {ApolloServer, AuthenticationError} from 'apollo-server-express';
import http from 'http';
import jwt from 'jsonwebtoken';

import models, {connectDB} from './models';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

// initial express
const app = express();
app.use(compression());
if (isProd) {
  app.use(express.static(path.join(__dirname,'client')));
}
app.use(cors());

// authentication functions
const getMe = async req => {
  let token;
  if (req.headers) {
    token = req.headers['x-token'];
  } else {
    token = req.token;
  }

  if (token) {
    try {
      return await jwt.verify(token, config.secret);
    } catch (error) {
      if (isDev) {
        console.log(
          chalk.red.bold(`authentication failed, token problem or expired : ${error}`)
        );
      }
      // throw new AuthenticationError('Session is expired, please sign in again.')
    }
  }
}

if (isDev) {
  console.log(
    chalk.magentaBright(`-> [SERVER-ENV] SECRET : ${config.secret}`)
  );
}

// apply graphql middleware
const graphqlServer = new ApolloServer({
  introspection: true,
  typeDefs,
  resolvers,
  playground: true,
  context: async ({req, connection}) => {
    if (connection) {
      return {
        models,
      }
    }
    if (req) {
      const me = await getMe(req);
      return {
        models,
        me,
        secret: config.secret,
      }
    }
  },
  subscriptions: {
    path: '/subs',
  },
});

graphqlServer.applyMiddleware({app, path: '/api'});
const httpServer = http.createServer(app);
graphqlServer.installSubscriptionHandlers(httpServer);

// STARTING SERVER ENGINE
connectDB().then(async () => {
  if (!isProd) {
    const dummyData = require('./dummy').default;
    await dummyData();
  }

  httpServer.listen({port: config.port}, () => {
    console.log(
      chalk.green.bold(`🚀 Server ready at http://localhost:${config.port}`)
    )
    console.log(
      chalk.greenBright.bold(`🚀 GraphQL Server ready at http://localhost:${config.port}${graphqlServer.graphqlPath}`)
    )
    console.log(
      chalk.green.bold(`🚀 GraphQL Subscription ready at ws://localhost:${config.port}${graphqlServer.subscriptionsPath}`)
    )
  })
});

// call react to server rendering
import serverRendering from './server-rendering';
app.use(serverRendering());