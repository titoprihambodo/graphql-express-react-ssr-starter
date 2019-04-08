const chalk = require('chalk');
const util = require('util');
const path = require('path');

const resolvePath = relativePath => path.resolve(__dirname, relativePath);

const compilerPromise = (name, compiler) => {
  return new Promise((resolve, reject) => {
    compiler.hooks.compile.tap(name, () => {
      console.log(
        chalk.cyan(`-> Compiling ${name}..`)
      );
    })
    compiler.hooks.done.tap(name, (stats) => {
      if (!stats.hasErrors()) {
        console.log(
          chalk.green.bold(`[${name}] compiled, OK!`)
        );
        return resolve()
      }
      return reject(`-> Failed to compile ${name}`);
    });
  });
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
  compilerPromise,
  sleep,
}