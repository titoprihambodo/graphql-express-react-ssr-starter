import React from 'react';
import {withRouter} from 'react-router-dom';

import './global.css';
import styles from './main.style.css';
import SignOut from 'Components/Signout';
import {SignInButton} from 'Pages/Auth';
import logo from 'Assets/logo.png'

const Header = (props) => (
  <div className={styles.header}>
    <div className={styles.headerContent}>
      <div className={styles.headerItems}>
        <img src={logo} alt="Tto" className={styles.headerLogo} onClick={() => props.history.push('/')}/>
      </div>
      <div className={styles.headerAccount}>
        <SignInButton {...props}/>
        <SignOut/>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <div className={styles.footer}>
    <div className={styles.footerContent}>

    </div>
  </div>
);

const MainLayout = ({children, history}) => (
  <div className={styles.wrap}>
    <Header history={history}/>
    <div className={styles.contentWrap}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
    <Footer/>
  </div>
);

export default withRouter(MainLayout);