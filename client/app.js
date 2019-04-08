import React, {Component, Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import Helmet from 'react-helmet';
import favicon from 'Public/favicon.png';
// pages
import Home from 'Pages/Home';
import Post from 'Pages/Post';
import Authentication from 'Pages/Auth';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <link rel="shortcut icon" type="image/png" href={favicon}/>
        </Helmet>
        <Switch>
          <Route exact path={'/'} component={Home}/>
          <Route path={'/home'} component={Home}/>
          <Route path={'/post'} component={Post}/>
          <Route path={'/signin'} component={Authentication}/>
        </Switch>
      </Fragment>
    )
  }
}

export default App;