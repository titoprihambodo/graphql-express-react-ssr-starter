import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import Posts from './Posts';
import Post from './SinglePost';

class PostPageEntry extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={'/post'} component={Posts}/>
        <Route path={'/post/:slug'} component={Post}/>
      </Switch>
    )
  }
};

export default PostPageEntry;