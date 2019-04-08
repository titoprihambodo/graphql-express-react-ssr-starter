import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';

import {Unauthenticated} from 'Components/Session';
import Posts from 'Components/Post/PostList';
import AddPost from 'Components/Post/AddPost';
import styles from './posts.style.css';
import Layout from 'Layouts/Main';

class PostPage extends Component {
  render() {
    return (
      <Layout>
        <Helmet>
          <title>Posts - Tto</title>
          <meta name='description' content='Tto Post List' />
        </Helmet>

        <div className={styles.contentWrap}>
          <div className={styles.postTitle}>
            Post List
          </div>
          <Unauthenticated>
            <p><Link to="/signin">Sign in</Link> to add post.</p>
          </Unauthenticated>
          <AddPost/>
          <br/>
          <Posts/>
        </div>
      </Layout>
    )
  }
};

export default PostPage;