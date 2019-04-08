import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';

import {authOnly} from 'Components/Session';
import styles from './addPost.style.css';

const ADD_POST = gql`
  mutation AddPost($title: String!, $content: String!, $slug: String!) {
    addPost(title: $title, content: $content, slug: $slug) {
      id
      title
      content
      createdAt
    }
  }
`;

class AddPost extends Component {
  constructor(props) {
    super(props);
  }

  _onSubmitPost = (event, submitter) => {
    event.preventDefault();
    submitter({variables: {
      title: this.state.title,
      content: this.state.content,
      slug: this.state.slug,
    }})
  }

  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.title}>Add some post</div>
        <div>
          <Mutation mutation={ADD_POST}>
          {
            (createPost, {loading, error}) => {
              if (loading) return <h3>Loading...</h3>
              if (error) return <h3>Internal Error 500</h3>
              return (
                <form
                  onSubmit={e => {this._onSubmitPost(e, createPost)}}
                >
                  <div className={styles.formRow}>
                    <label>Title :</label> <br/>
                    <input
                      type="text"
                      placeholder={'Post Title'}
                      onChange={e => this.setState({title: e.target.value})}
                    />
                  </div>
                  <div className={styles.formRow}>
                    <label>Content :</label><br/>
                    <textarea
                      type="text"
                      placeholder={'Post content'}
                      onChange={e => this.setState({content: e.target.value})}
                    />
                  </div>
                  <div className={styles.formRow}>
                    <label>Slug :</label><br/>
                    <input
                      type="text"
                      placeholder={'Post Slug (eg: new-post)'}
                      onChange={e => this.setState({slug: e.target.value})}
                    />
                  </div>
                  <div className={styles.buttonRow}>
                    <button type="submit">Post!</button>
                  </div>
                </ form>
              )
            }
          }
          </ Mutation>
        </div>
      </div>
    )
  }
}

export default authOnly(AddPost);