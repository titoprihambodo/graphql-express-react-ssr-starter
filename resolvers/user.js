import jwt from 'jsonwebtoken';
import {AuthenticationError, UserInputError} from 'apollo-server-express';

const generateToken = async (user, secret, expiresIn) => {
  const {id, email, username, role} = user
  return await jwt.sign({id, email, username, role}, secret, {expiresIn});
};

export default {
  Query: {
    users: async (obj, args, {models}) => {
      return await models.User.find();
    },
    user: async (obj, {id}, {models}) => {
      return await models.User.findById(id);
    },
    userByUsername: async (obj, {username}, {models}) => {
      return await models.User.findOne({username});
    },
    me: async (obj, args, {models, me}) => {
      if (!me) {
        return null;
      };
      return await models.User.findById(me.id);
    },
  },
  Mutation: {
    signUp: async (obj, {username, email, password}, {models, secret}) => {
      const user = await models.User.create({username, email, password});
      return {token: generateToken(user, secret, '7h')};
    },
    signIn: async (obj, {login, password}, {models, secret}) => {
      const user = await models.User.findByLogin(login)
      if (!user) {
        throw new UserInputError(
          'User is not found.'
        );
      }
      const isValid = await user.validatePassword(password);
      if (!isValid) {
        throw new AuthenticationError('Wrong login/password.');
      }
      return {token: generateToken(user, secret, '7h')};
    },
  },
}