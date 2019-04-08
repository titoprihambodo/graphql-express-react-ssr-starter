//running after "build" in production evironment
require('@babel/register');
process.on('unhandledRejection', err => {
  throw err;
})

// log opening
console.clear();
const chalk = require('chalk');
console.log(
  chalk.yellow.bold('-= Simulating awesome production server =-')
);

const path = require('path');
const {mongoDev} = require('../config');

const start = () => {
  process.env.PORT = 7777;
  process.env.MONGO_URL = mongoDev;
  process.env.SECRET = 'YfFsN998V8NSqqWAtpayJLoEvvGRkmS07MgNKx2X7jIWabiep90yJrBLK3G3GsGryQnLpxGE3dWGV62dPM61lg==';
  console.log('[SET] Environment Variables :')
  console.log('-> process.env.NODE_ENV', process.env.NODE_ENV)
  console.log('-> process.env.PORT', process.env.PORT)
  console.log('-> process.env.MONGO_URL', process.env.MONGO_URL)
  console.log('-> process.env.SECRET', process.env.SECRET)

  // running server.bundle.js
  require(path.resolve(__dirname, '../build/server.bundle.js'));
};

start();

