
import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';

import Layout from 'Layouts/Main';
import {Unauthenticated} from 'Components/Session';
import {Auth} from 'Pages/Auth';
import styles from './home.style.css';
import ApolloLogo from 'Assets/apollo.png';

class HomePage extends Component {
  render() {
    return (
      <Layout>
        <Helmet>
          <title>Homepage of Tto</title>
          <meta name='description' content='New project' />
        </Helmet>
        <div className={styles.wrap}>
          <div className={styles.leftColumn}>
            <div className={styles.homeTitle}>Initial Page of ApolloGraphQL Starter App</div>
            <img src={ApolloLogo} alt="Apollo" className={styles.contentLogo}/>
            <div className={styles.linkList}>
              <Link to="/post" className={styles.textLink}>
                ► Go to "Posting" page
              </Link>
            </div>
          </div>
          <div className={styles.rightColumn}>
            <Unauthenticated>
              <div className={styles.signupWrap}>
                <Auth/>
              </div>
            </Unauthenticated>
          </div>
        </div>
      </Layout>
    )
  }
};

export default HomePage;