import React from 'react';
import {ApolloConsumer} from 'react-apollo';
import {authOnly} from 'Components/Session';

import styles from './index.style.css';

const _onSignOut = client => {
  localStorage.removeItem('tto-token');
  client.resetStore();
}

const SignOut = () => (
  <ApolloConsumer>
  {
    client => (
      <div>
        <button type="button" onClick={() => _onSignOut(client)} className={styles.signOutButton}>Sign Out!</button>
      </div>
    )
  }
  </ApolloConsumer>
)

export default authOnly(SignOut);