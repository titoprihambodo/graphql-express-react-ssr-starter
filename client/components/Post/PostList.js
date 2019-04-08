import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
import moment from 'moment';
import _ from 'lodash/core';
import {withRouter} from 'react-router-dom';

import styles from './postList.style.css';

const GET_POSTS = gql`
	query($cursor: String, $limit: Int) {
		posts(cursor: $cursor, limit: $limit)
		@connection(key: "PostConnection") {
			edges {
				id
				title
				content
				createdAt
				slug
			}
			pageInfo {
				hasNextPage
				endCursor
			}
		}
	}
`;
const POST_ADDED = gql`
	subscription {
		posted {
			post {
				id
				title
				content
				createdAt
				slug
			}
		}
	}
`;
const DELETE_POST = gql`
	mutation DeletePost($id: ID!) {
		deletePost(id: $id)
	}
`;
const POST_DELETED = gql`
	subscription {
		deleted
	}
`;

class PostList extends Component {
	render() {
		return (
			<Query query={GET_POSTS} variables={{limit: this.props.limit}}>
			{
				({loading, error, data, subscribeToMore, fetchMore}) => {
					if (loading) return <h3>Loading...</h3>
					if (error) return <h3>Internal Error 500</h3>

					return (
						<div className={styles.postListWrap}>
							<PostListWithSubs
								data={data}
								subscribeToMore={subscribeToMore}
								history={this.props.history}
							/>
							{data.posts.pageInfo && data.posts.pageInfo.hasNextPage && <More
								limit={this.props.limit}
								pageInfo={data.posts.pageInfo}
								fetchMore={fetchMore}
							>
								Load More..
							</More>}
						</div>
					);
				}
			}
			</Query>
		)
	}
}

const More = ({limit, pageInfo, fetchMore, children}) => (
	<button type="button"
		onClick={() => fetchMore({
			variables: {
				cursor: pageInfo.endCursor,
				limit,
			},
			updateQuery: (prev, {fetchMoreResult}) => {
				if (!fetchMoreResult) {
					return prev;
				}
				const newData = fetchMoreResult.posts;
				return Object.assign({}, prev, {
					posts: {
						...newData,
						edges: [...prev.posts.edges, ...newData.edges],
					},
				})
			},
		})}
		className={styles.moreButton}
	>
		{children}
	</button>
)

class PostListWithSubs extends Component {
	subcription = () => [
		this.props.subscribeToMore({
			document: POST_ADDED,
			updateQuery: (prev, {subscriptionData}) => {
				if (!subscriptionData.data) return prev;
				const newData = subscriptionData.data.posted.post;

				return Object.assign({}, prev, {
					posts: {
						...prev.posts,
						edges: [newData, ...prev.posts.edges],
					},
				})
			}
		}),
		this.props.subscribeToMore({
			document: POST_DELETED,
			updateQuery: (prev, {subscriptionData}) => {
				if (!subscriptionData.data) return prev;
				const id = subscriptionData.data.deleted;

				return Object.assign({}, prev, {
					posts: {
						...prev.posts,
						edges: _.filter(prev.posts.edges, item => item.id !== id),
					},
				});
			}
		})
	]
	_onDeletePost = (event, exec, {id}) => {
		event.preventDefault();
		exec({variables: {
			id: id
		}})
	}
	componentDidMount() {
		this.subcription();
	}
	_onClickPostLink = (slug) => {
		this.props.history.push(`/post/${slug}`);
	}
	render() {
		const {data: {posts}} = this.props;
		return posts.edges.map(({id, title, createdAt, slug}) => (
			<div key={id} className={styles.postItemWrap}>
				<div className={styles.timeStamp}>{moment(createdAt).fromNow()}</div>
				<div className={styles.postTitle} onClick={e => this._onClickPostLink(slug)}>{title}</div>
				<Mutation mutation={DELETE_POST}>
				{
					(deletePost, {loading, error}) => {
						if (loading) return <h3>Loading...</h3>
						if (error) return <h5>{error.toString()}</h5>
						return (
							<button onClick={e => this._onDeletePost(e, deletePost, {id})} className={styles.deleteButton}>
								Delete Post
							</ button>
						)
					}
				}
				</ Mutation>
			</div>
		))
	}
}

export default withRouter(PostList);