import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    posts(cursor: String, limit: Int): PostConnection!
    post(slug: String!): Post
  }

  extend type Mutation {
    addPost(title: String!, content: String!, slug: String!): Post!
    deletePost(id: ID!): Boolean!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    slug: String!
    meta: Meta
    createdAt: Date
    updatedAt: Date
  }

  type Meta {
    description: String
    keywords: String
  }

  type PostConnection {
    edges: [Post!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  extend type Subscription {
    posted: Posted!
    deleted: ID
  }

  type Posted {
    post: Post!
  }
`;