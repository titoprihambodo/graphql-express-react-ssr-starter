# ApolloGraphQL-Express-React-SSR Starter App

![tto-logo](https://i.imgur.com/EP0u3us.png?1)

A simple example / project starter using ExpressJS, GraphQL and ReactJS. Helps people to learn graphql with apollographql in actual app.

##
![enter image description here](https://i.imgur.com/7u8eZK8.gif)
## Features
 - [x] **ApolloGraphQL** for GraphQL server
 - [x] **react-apollo** for client side.
 - [x] MongoDB Models with **Mongoose**.
 - [x] **ExpressJS**
 - [x] **ReactJS 16.8**
 - [x] **React-router**
 - [x] Simple Authentication with **JWT**
 - [x] **Subscription** (on created, on deleted)
 - [x] **Webpack 4**
 - [x] **Babel 7**
 - [x] **Server Side Rendering (SSR)**, better performance and SEO friendly.
 - [x] **Hot Module Replacement (HMR)** and **React Hot Reload** for faster development.
 - [x] **CSS Modules**
 - [x] Testing GraphQL queries and mutations with **Jest**.
 - [x] Cursor-based pagination
 - [ ] Testing React Component with Jest + **Enzyme**.

## Installation
Preparation :

    git clone https://github.com/titoprihambodo/graphql-express-react-ssr-starter
    npm install
    cd graphql-express-react-ssr-starter/

change server port and mongoDB URL in /config/index.js.
start project (development) :
`npm start`

testing project :
`npm run start:test`

build (production) :

    npm run build

    # production simulation:
    npm run start:prod

    # deployment,
    # - copy all files in folder build
    # - copy package.json to project root folder
    npm install --production

## Directory Structure
```
graphql-express-react-ssr-starter/
├── __test__                # testing
├── build/                  # bundled code for production
├── client/                 # client source code
|   ├── components/
|   ├── layouts/
|   ├── pages/
|   ├── apollo.js           # apollo client setup
|   └── index.js            # client entry
├── config/                 # app config
├── dist/                   # bundled code for development
├── models/                 # model/schema for Database
├── public/                 # public assets/scripts
├── resolvers/              # graphql resolvers
├── scripts/                # scripts to run, build and test the app
├── subscription/           # graphql pubsub event
├── typeDefs/               # graphql schema
├── webpack.config/         # webpack config dev and prod
└── server.js               # server entry
```

**Aliases**
In the webpack config, there are aliases to resolve some path :
```
Components  -> client/components/*
Layouts     -> client/Layouts/*
Pages       -> client/pages/*
Public      -> public/*
Assets      -> public/assets/*
```

> For editor, VSCode is recommended to get alias working with the setup in jsconfig.json.

## More about Apollo GraphQL
https://www.apollographql.com/docs/apollo-server/

## Donation
If this project help you reduce time to develop, you can give me a cup of coffee :)

[![paypal](https://i.imgur.com/gccXps9.gif)](https://paypal.me/titoprihambodo?locale.x=id_ID)
