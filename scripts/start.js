require('@babel/register')

process.on('unhandledRejection', err => {
  throw err;
})

// log opening
console.clear();
const chalk = require('chalk');
console.log(
  chalk.yellow.bold('-= Starting awesome server =-')
)

const express = require('express');
const rimraf = require('rimraf');
const path = require('path');
const nodemon = require('nodemon');
const moment = require('moment');
const {compilerPromise} = require('./utils');

const resolvePath = relativePath => path.resolve(__dirname, relativePath);

// webpack
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

// webpack config for development
const configDevClient = require('../webpack.config/dev.client');
const configDevServer = require('../webpack.config/dev.server');

const app = express();
const {WEBPACK_PORT} = require('../config');

const start = async () => {
  rimraf.sync(resolvePath('../dist'));

  // extra webpack config
  configDevClient.entry.app = [
    `webpack-hot-middleware/client?path=http://localhost:${WEBPACK_PORT}/__webpack_hmr`,
    ...configDevClient.entry.app,
  ]

  configDevClient.output.publicPath = `http://localhost:${WEBPACK_PORT}/`;
  configDevServer.output.publicPath = `http://localhost:${WEBPACK_PORT}/`;

  const compiler = webpack([configDevClient, configDevServer]);
  const clientCompiler = compiler.compilers.find(cmplr => cmplr.name === 'client');
  const serverCompiler = compiler.compilers.find(cmplr => cmplr.name === 'server');

  const clientPromise = compilerPromise('client', clientCompiler);
  const serverPromise = compilerPromise('server', serverCompiler);

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    return next()
  });

  app.use(webpackDevMiddleware(clientCompiler, {
    noInfo: true,
    hot: true,
    publicPath: configDevClient.output.publicPath,
    progress: true,
    stats: {
      colors: true,
      children: false,
    },
    watchOptions: {
      poll: 1000,
    },
    serverSideRender: true,
  }));
  app.use(webpackHotMiddleware(clientCompiler));

  app.listen(WEBPACK_PORT);

  serverCompiler.watch({ignored: /node_modules/}, (err, stats) => {
    if (!err && !stats.hasErrors()) {
      console.log(
        chalk.blueBright(`-> [watcher] webpack server, OK!`)
      );
    }

    if (err) {
      console.log(
        chalk.red(`-> [watcher] server error: ${err}`)
      )
    }

    if (stats.hasErrors()) {
      const info = stats.toJson();
      const errors = info.errors[0].split('\n');
      console.log(
        chalk.red(`[watcher] server error 1: ${errors[0]}`)
      )
      console.log(
        chalk.red(`[watcher] server error 2: ${errors[1]}`)
      )
      console.log(
        chalk.red(`[watcher] server error 3: ${errors[2]}`)
      )
    }
  })

  // wait until compiling is done.
  try {
    await serverPromise;
    await clientPromise;
  } catch (error) {
    console.log(
      chalk.red.bold(`-> [Promise compiler] error: ${error}`)
    )
  }

  // nodemon script for server app
  const script = nodemon({
    script: resolvePath('../dist/dev-server.bundle.js'),
    ignore: ['src', 'scripts', 'config', './*.*', 'build/client', 'client', 'dist/client'],
  });

  script.on('restart', () => {
    console.log(
      chalk.black.bgYellow(`-> (${moment(Date.now()).format('D-MMM-YYYY, H:mm:ss zZZ')}) Restarting server..`)
    );
  });

  script.on('quit', () => {
    console.log(
      chalk.black.bgCyan.bold(` -> (${moment(Date.now()).format('D-MMM-YYYY, H:mm:ss zZZ')}) Shuting down the server app..`)
    );
    process.exit();
  });

  script.on('error', () => {
    console.log(
      chalk.black.bgRed.bold(`-> (${moment(Date.now()).format('D-MMM-YYYY, H:mm:ss zZZ')}) An error occured. Exiting..`)
    );
    process.exit(1);
  });
};

start();

