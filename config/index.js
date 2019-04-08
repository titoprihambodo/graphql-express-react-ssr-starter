import chalk from 'chalk';

// environment checking
export const isDev = process.env.NODE_ENV === 'development' || false;
export const isProd = process.env.NODE_ENV === 'production' || false;
// webpack port for development
export const WEBPACK_PORT = !isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) + 1 : 4001;

console.log(
  chalk.cyanBright(`
    Load Config
      -> environment : ${process.env.NODE_ENV} (${isProd})
      -> mongoURL : ${process.env.MONGO_URL}
      -> port : ${process.env.PORT}
      -> secret : ${process.env.SECRET}
  `)
);

export const mongoDev = 'mongodb://localhost:9999/tto-dev';
const mongoTest = 'mongodb://localhost:9999/tto-test';

// General config
const config = {
  mongoURL: isProd ? (process.env.MONGO_URL) : (isDev ? mongoDev : mongoTest),
  port: process.env.PORT || 4000,
  secret: isProd ? process.env.SECRET : process.env.SECRET || 'YfFsN998V8NSqqWAtpayJLoEvvGRkmS07MgNKx2X7jIWabiep90yJrBLK3G3GsGryQnLpxGE3dWGV62dPM61lg==',
};

export default config;