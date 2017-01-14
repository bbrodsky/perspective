import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
//import firebase from 'firebase'

import App from './components/App'
import Home from './components/Home'
import Chat from './components/Chat'
import Discussion from './components/VideoTest'

import {setFirebase} from './reducers/firebase'
import store from './store'

import {onAppEnter} from './onEnter'

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App} onEnter={onAppEnter}>
      <IndexRedirect to="/home" />
      <Route path="/home" component={Home} />
      <Route path="/chat" component={Chat} />
      <Route path="/discussion/*" component={Discussion} />
    </Route>
  </Router>
);
