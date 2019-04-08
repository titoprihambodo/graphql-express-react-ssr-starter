import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import {withRouter} from 'react-router-dom';

import styles from './index.style.css';

const SIGN_IN = gql`
  mutation SignIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`;

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
  };

  _onSubmit = (event, submitter) => {
    event.preventDefault();
    submitter({variables: {
      login: this.state.login,
      password: this.state.password,
    }}).then(({data}) => {
      localStorage.setItem('tto-token', data.signIn.token);
      if (this.props.onSuccessRedirectTo) {
        this.props.history.push(this.props.onSuccessRedirectTo);
      } else {
        this.props.history.push('/post');
      }
    })
  };

  _handleSignUpLink = e => {
    if (this.props.setForm) {
      this.props.setForm('signup');
    }
  }

  render() {
    const {login, password} = this.state;
    const isInvalid = login === '' || password === '';
    return (
      <Mutation mutation={SIGN_IN}>
      {
        (signIn, {error, loading}) => {
          if (loading) return <h3>Loading...</h3>;
          if (error) return <h3>Internal Error 500</h3>;
          return (
            <form onSubmit={e => this._onSubmit(e, signIn)}>
              <div>
                <h3>Sign In</h3>
                <div className={styles.formRow}>
                  <label>Login</label>
                  <input type="text" autoComplete="username" placeholder="Username / Email" onChange={e => this.setState({login: e.target.value})} className={styles.inputForm}/>
                </div>
                <div className={styles.formRow}>
                  <label>Password</label>
                  <input type="password" autoComplete="current-password" placeholder="Password" onChange={e => this.setState({password: e.target.value})} className={styles.inputForm}/>
                </div>
                <div className={styles.formRow}>
                  <button type="submit" disabled={isInvalid} className={styles.signInButton}>Login!</button>
                </div>
                <div className={styles.otherOptions}>
                  Create an account? &nbsp;<a className={styles.textLink} onClick={this._handleSignUpLink}>Sign Up</a>
                </div>
              </div>
            </form>
          )
        }
      }
      </Mutation>
    )
  }
};

export default withRouter(Signin);