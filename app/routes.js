import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import firebase from 'firebase'

import App from './components/App'
import Home from './components/Home'
import Chat from './components/Chat'

import {setFirebase} from './reducers/firebase'
import store from './store'

var config = {
  apiKey: "AIzaSyDpkgcycwuu4PvgDf-thm8tmkyH1V6OF-o",
  authDomain: "perspective-be6df.firebaseapp.com",
  databaseURL: "https://perspective-be6df.firebaseio.com",
  storageBucket: "perspective-be6df.appspot.com",
  messagingSenderId: "382160935274"
};

firebase.initializeApp(config);
store.dispatch(setFirebase(firebase))


export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/home" />
      <Route path="/home" component={Home} />
      <Route path="/chat" component={Chat} />
    </Route>
  </Router>
);
