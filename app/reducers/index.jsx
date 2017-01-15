import { combineReducers } from 'redux';
import firebase from './firebase'
import user from './user'
import messages from './messages'

const rootReducer = combineReducers({
  firebase,
  user,
  messages
});

export default rootReducer;
