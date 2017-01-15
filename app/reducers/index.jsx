import { combineReducers } from 'redux';
import firebase from './firebase'
import user from './user'
import messages from './messages'
import databox from './databox'

const rootReducer = combineReducers({
  firebase,
  user,
  messages,
  databox
});

export default rootReducer;
