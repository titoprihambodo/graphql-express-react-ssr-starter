import {createTestClient} from 'apollo-server-testing';
import gql from 'graphql-tag';
import mongoose from 'mongoose';
import config from '../config';
import dummy from '../dummy';
import {constructTestServer, whoami} from './__utils';

beforeEach(async (done) => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(config.mongoURL, {
      useCreateIndex: true,
      useNewUrlParser: true,
    });
    await dummy();
    return done();
  }
  return done();
});

const GET_POSTS = gql`
  {
    posts {
      title
      slug
      content
      createdAt
    }
  }
`;
const GET_POST = gql`
  query ($slug: String!) {
    post(slug: $slug) {
      title
      slug
      content
      createdAt
    }
  }
`;
const ADD_POST = gql`
  mutation ($title: String!, $content: String!, $slug: String!) {
    addPost(title: $title, content: $content, slug: $slug) {
      title
      slug
      content
      createdAt
    }
  }
`;
const USER_SIGN_UP = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`;
const GET_ME = gql`
  {
    me {
      username
      email
    }
  }
`;
const GET_USER_BY_USERNAME = gql`
  query ($username: String!) {
    userByUsername(username: $username) {
      username
      email
    }
  }
`;

describe('[ApolloGraphQL Server] Queries', () => {
  it('get posts', async () => {
    const server = constructTestServer();
    const {query} = createTestClient(server);
    const posts = await query({query: GET_POSTS});
    expect(posts).toBeDefined();
  });
  it('get post', async () => {
    const server = constructTestServer();
    const {query} = createTestClient(server);
    const post = await query({query: GET_POST, variables: {
      slug: 'cicero-dummy'
    }});
    expect(post).toMatchSnapshot();
  });
  it('get (me) by token', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOGU1OGNhYmEyMDNlMTVkM2NmYmM2NiIsImVtYWlsIjoicHJpaGFtYm9kby50aXRvQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidGl0byIsImlhdCI6MTU1MjgzMjcxNCwiZXhwIjoxNTUyODU3OTE0fQ.XWWB2bgqLing47qjKDBDipAF06V2PkY7FzL45LtaaRs';
    const me = await whoami(token);
    const server = constructTestServer({me});
    const {query} = createTestClient(server);
    const whoamiToServer = await query({query: GET_ME});
    expect(whoamiToServer).toMatchSnapshot();
  });
});

describe('[ApolloGraphQL Server] Mutation', () => {
  it('user SignUp', async () => {
    const server = constructTestServer({secret: config.secret});
    const {query, mutate} = createTestClient(server);
    const res = await mutate({mutation: USER_SIGN_UP, variables: {
      username: 'tito',
      email: 'prihambodo.tito@gmail.com',
      password: 'demotesting',
    }});
    const findRegistered = await query({query: GET_USER_BY_USERNAME, variables: {username: 'tito'}});
    expect(findRegistered).toMatchSnapshot();
  });
  it('add post', async () => {
    const server = constructTestServer();
    const {query, mutate} = createTestClient(server);
    const post = await mutate({mutation: ADD_POST, variables: {
      title: 'Dummy Post',
      content: 'Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver. Looking down into the dark gulf below, I could see a ruddy light streaming through a rift in the clouds.',
      slug: 'dummy-content',
    }});
    const added = await query({query: GET_POST, variables: {slug: 'dummy-content'}});
    expect(added.data).toMatchSnapshot();
  });
});