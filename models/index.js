import mongoose from 'mongoose';
import chalk from 'chalk';
import config from '../config';

// Collections
import Post from './post';
import User from './user';

console.log(
  chalk.cyanBright(`connecting to mongourl : ${config.mongoURL}`)
);
export const connectDB = () => {
  return mongoose.connect(config.mongoURL, {
    useCreateIndex: true,
    useNewUrlParser: true
  },)
}

const models = {
  Post,
  User,
};

export default models;