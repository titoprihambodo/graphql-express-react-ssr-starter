import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {withRouter} from 'react-router-dom';

import Post from 'Components/Post/PostDetails';
import Layout from 'Layouts/Main';
import styles from './singlePost.style.css';

class SinglePostPage extends Component {
	render () {
		const {params} = this.props.match
		return (
			<Layout>
				<Helmet>
					<title>Post Details</title>
					<meta name="description" content="Any Post" />
				</Helmet>
        <div className={styles.wrap}>
          {params.slug ? <Post slug={params.slug}/> : 'Not found.'}
        </div>
			</Layout>
		)
	};
};

export default withRouter(SinglePostPage);
