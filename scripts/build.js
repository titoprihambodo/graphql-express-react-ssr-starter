require('@babel/register');

// log opening
console.clear();
const chalk = require('chalk');
const moment = require('moment');
console.log(
  chalk.yellow.bold('-= Bundling Code for Production =-')
)
console.log(
  chalk.magenta.bold(`-> (${moment(Date.now()).format('D-MMM-YYYY, H:mm:ss zZZ')}) starting..`)
);

const rimraf = require('rimraf');
const path = require('path');
const resolvePath = relativePath => path.resolve(__dirname, relativePath);

// webpack config for production
const webpack = require('webpack');
const {compilerPromise} = require('./utils');
const configProdClient = require('../webpack.config/prod.client');
const configProdServer = require('../webpack.config/prod.server');

const buildServer = async () => {
  const serverCompiler = webpack(configProdServer);

  serverCompiler.watch({}, (err, stats) => {
    if (!err && !stats.hasErrors()) {
      console.log(
        chalk.cyan.bold(`-> [build-watcher] server code bundling, OK! \n-> result :`)
      );
      console.log(stats.toString({
        chunks: false,
        colors: true,
      }));
      return;
    }
    if (err) {
      console.log(
        chalk.red(`-> [build-watcher] server code bundling error: ${err}`)
      )
      return;
    }
  });

  const serverPromise = compilerPromise('server', serverCompiler);

  // wait until compiling is done.
  try {
    await serverPromise.catch(e => console.log(e));
    console.log(
      chalk.white.bold(`-> (${moment(Date.now()).format('D-MMM-YYYY, H:mm:ss zZZ')}) server - finish!`)
    );
    process.exit();
  } catch (error) {
    console.log(
      chalk.red.bold(`-> [Promise compiler] error: ${error}`)
    )
  }
};

const buildClient = async () => {
  await rimraf.sync(resolvePath('../build'));

  const clientCompiler = webpack(configProdClient);

  clientCompiler.watch({}, (err, stats) => {
    if (!err && !stats.hasErrors()) {
      console.log(
        chalk.cyan.bold(`-> [build-watcher] client code bundling, OK! \n-> result :`)
      );
      console.log(stats.toString({
        chunks: false,
        colors: true,
        children: false,
      }));
    }
    if (err) {
      console.log(
        chalk.red(`-> [build-watcher] client code bundling error: ${err}`)
      )
      return;
    }
  });

  const clientPromise = compilerPromise('client', clientCompiler);
  // wait until compiling is done.
  try {
    await clientPromise.catch(e => console.log(e));
    console.log(
      chalk.white.bold(`-> (${moment(Date.now()).format('D-MMM-YYYY, H:mm:ss zZZ')}) client - finish!`)
    );
    return;
  } catch (error) {
    console.log(
      chalk.red.bold(`-> [Promise compiler] error: ${error}`)
    )
  }
};

const build = async () => {
  await buildClient();
  await buildServer();
}

build();

