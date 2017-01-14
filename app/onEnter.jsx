import firebase from 'firebase'
import {setFirebase} from './reducers/firebase'
import store from './store'
import { setUser, clearUser } from './reducers/user'
import {setMessages} from './reducers/messages'

var config = {
  apiKey: "AIzaSyDpkgcycwuu4PvgDf-thm8tmkyH1V6OF-o",
  authDomain: "perspective-be6df.firebaseapp.com",
  databaseURL: "https://perspective-be6df.firebaseio.com",
  storageBucket: "perspective-be6df.appspot.com",
  messagingSenderId: "382160935274"
};

firebase.initializeApp(config);

export const onAppEnter = () => {
  firebase.database().ref("TEST").set("STRING")
  store.dispatch(setFirebase(firebase))

  firebase.database().ref('messages').on('value', snapshot => {
    if(!snapshot) return;
    store.dispatch(setMessages(snapshot.val()));
  })

  firebase.auth().onAuthStateChanged(user => {
    if (!user) { // if not authenticated, send to login
      store.dispatch(clearUser());
    }
    else { // otherwise, set user on store
      store.dispatch(setUser(user));
    }
  });
}
