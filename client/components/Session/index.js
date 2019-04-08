import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {Redirect} from 'react-router-dom';

const GET_ME = gql`
  {
    me {
      username
      email
    }
  }
`;

const withAuth = Component => props => (
  <Query query={GET_ME} ssr={false} fetchPolicy="network-only">
  {
    ({data, networkStatus, refetch, loading, error}) => {
      if (loading) return <h1>Loading</h1>;
      if (error) return <h3>Internal Error 500</h3>
      if (networkStatus < 7) {
        return Error('Network failed.');
      }

      return data && data.me ? <Component {...props} refetch={refetch} user={data}/> : <Redirect to={'/signin'}/>;
    }
  }
  </Query>
)

export const authOnly = Component => props => (
  <Query query={GET_ME} ssr={false} fetchPolicy="network-only">
  {
    ({data, networkStatus, refetch, loading, error}) => {
      if (loading) return <h1>Loading</h1>;
      if (networkStatus < 7) {
        return Error('Network failed.');
      }

      return data && data.me ? <Component {...props} refetch={refetch} user={data}/> : '';
    }
  }
  </Query>
)

export const Unauthenticated = props => (
  <Query query={GET_ME} ssr={false} fetchPolicy="network-only">
  {
    ({data, networkStatus, refetch, loading, error}) => {
      if (loading) return '';
      if (networkStatus < 7) {
        return Error('Network failed.');
      }

      return data && data.me ? '' : props.children;
    }
  }
  </Query>
)

export default withAuth;