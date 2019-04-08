import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import {withRouter, Link} from 'react-router-dom';

import styles from './index.style.css';

const SIGN_UP = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    }
  }

  _onSubmit = (event, submitter) => {
    event.preventDefault();
    submitter({variables: {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    }}).then(async ({data}) => {
      await localStorage.setItem('tto-token', data.signUp.token);
      this.props.history.push('/post');
    });
  };

  _handleSignInLink = e => {
    if (this.props.setForm) {
      this.props.setForm('signin');
    }
  }

  render() {
    const {username, email, password, passwordConfirm} = this.state;
    const isInvalid = passwordConfirm !== password || password === '' || username === '' || email === '';
    return (
      <Mutation mutation={SIGN_UP}>
      {
        (signUp, {data, loading, error}) => {
          if (loading) return <h3>Loading...</h3>;
          if (error) return <h3>Internal Error 500</h3>;

          return (
            <form onSubmit={e => this._onSubmit(e, signUp)}>
              <div className={styles.signUpWrap}>
                <h3>Sign Up</h3>
                <div className={styles.formRow}>
                  <label>Username</label><br/>
                  <input type="text" placeholder="Username" autoComplete="username" onChange={e => this.setState({username: e.target.value})} className={styles.inputForm}/>
                </div>
                <div className={styles.formRow}>
                  <label>Email</label><br/>
                  <input type="text" placeholder="Email" autoComplete="email" onChange={e => this.setState({email: e.target.value})} className={styles.inputForm}/>
                </div>
                <div className={styles.formRow}>
                  <label>Password</label><br/>
                  <input type="password" placeholder="Password" autoComplete="new-password" onChange={e => this.setState({password: e.target.value})} className={styles.inputForm}/>
                </div>
                <div className={styles.formRow}>
                  <label>Confirm Password</label><br/>
                  <input type="password" placeholder="Confirm Password" autoComplete="new-password" onChange={e => this.setState({passwordConfirm: e.target.value})} className={styles.inputForm}/>
                </div>
                <div className={styles.formRow}>
                  <button type="submit" disabled={isInvalid} className={styles.signUpButton}>Sign up!</button>
                </div>
                <div className={styles.otherOptions}>
                  Already have an account? &nbsp;<a className={styles.textLink} onClick={this._handleSignInLink}>Sign In</a>
                </div>
              </div>
            </form>
          );
        }
      }
      </ Mutation>
    );
  }
}

export default withRouter(Signup);