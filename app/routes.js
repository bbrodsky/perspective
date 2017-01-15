import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
//import firebase from 'firebase'

import App from './components/App'
import Home from './components/Home'
import Chat from './components/Chat'
import Discussion from './components/VideoTest'

import {setFirebase} from './reducers/firebase'
import store from './store'
import Landing from './components/landing'

import {onAppEnter} from './onEnter'

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App} onEnter={onAppEnter}>
      <IndexRedirect to="/landing" />
      <Route path="/home" component={Home} />
      <Route path="/landing" component={Landing} />
      <Route path="/discussion/*" component={Discussion} />
    </Route>
  </Router>
);
