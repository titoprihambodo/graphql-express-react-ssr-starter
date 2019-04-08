import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    userByUsername(username: String!): User
    me: User
  }

  extend type Mutation {
    signUp(username: String!, email: String!, password: String!): Token!
    signIn(login: String!, password: String!): Token!
  }

  type Token {
    token: String!
  }

  type User {
    username: String!
    password: String
    email: String!
    token: String
    role: String
  }
`;