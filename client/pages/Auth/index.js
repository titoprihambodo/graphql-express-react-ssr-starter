import React, {Component} from 'react';

import Signin from 'Components/Signin';
import Signup from 'Components/Signup';
import Layout from 'Layouts/Main';
import {Unauthenticated} from 'Components/Session';
import styles from './index.style.css';

export const SignInButton = ({history}) => (
  <Unauthenticated>
    <button type="button"
      onClick={e => history.push('/signin')}
      className={styles.signInButton}
    >Sign In!</button>
  </Unauthenticated>
);

export class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: 'signin',
    }
  }
  changeForm = arg => {
    this.setState({form: arg});
  }
  render() {
    return (
      <div className={styles.authWrap}>
        {this.state.form === 'signin' ? (<Signin setForm={this.changeForm}/>) : (<Signup setForm={this.changeForm}/>)}
      </div>
    );
  }
}

class AuthPage extends Component {
  render() {
    return (
      <Layout>
        <div className={styles.wrap}>
          <Auth/>
        </div>
      </Layout>
    );
  }
}

export default AuthPage;