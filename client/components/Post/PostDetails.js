import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import moment from 'moment';
import Helmet from 'react-helmet';

import styles from './postDetails.style.css';

const GET_SINGLE_POST = gql`
	query ($slug: String!) {
		post(slug: $slug) {
			id
			title
			content
			createdAt
		}
	}
`;

const PostDetails = ({slug}) => (
	<Query query={GET_SINGLE_POST} variables={{slug: slug}} fetchPolicy="cache-and-network">
	{
		({data, loading, error}) => {
			if (loading) return <h3>Loading..</h3>;
      if (error) return <h3>Internal Error 500</h3>;

      const {id, title, createdAt, content} = data.post;

			return (
        <div key={id}>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={content} />
          </Helmet>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.postingTime}>
            {moment(createdAt).fromNow()}
          </div>
          <div className={styles.content}>
            {content}
          </div>
        </div>
			);
		}
	}
	</Query>
);

export default PostDetails;
