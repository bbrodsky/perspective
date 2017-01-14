import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firebase: null
    }
    this.submitComment.bind(this)
  }

  submitComment(event){
    const { firebase } = this.props;
    const auth = firebase.auth();
    event.preventDefault();
    // console.log("FORM", event.target['message'].value)
    firebase.database().ref('messages').push({
      name: auth.currentUser.displayName,
      text: event.target.message.value,
      photoUrl: auth.currentUser.photoURL
    })
    event.target.message.value = '';
  }

  render() {
    return (
      <div id="messages-form" className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--6-col-tablet mdl-cell--12-col-desktop">
        <div className="mdl-card__supporting-text mdl-color-text--grey-600">
          <form id="message-form" action="#" onSubmit={(e) => this.submitComment(e)}>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="message" />
              <label className="mdl-textfield__label" htmlFor="message">Message...</label>
            </div>
            <button id="submit" form="message-form" className="mdl-button submit-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
              Send
            </button>
            <input id="mediaCapture" type="file" accept="image/*,capture=camera" />
            {/* <button id="submitImage" title="Add an image" className="mdl-button picture-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--amber-400 mdl-color-text--white">
              <i className="material-icons">image</i>
            </button> */}
          </form>
          <form id="image-form" action="#">
          </form>
        </div>
      </div>
    )
  }
}
