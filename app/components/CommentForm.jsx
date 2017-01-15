import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
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
      photoUrl: auth.currentUser.photoURL,
      score: 0
    })
    event.target.message.value = '';
  }

  render() {
    return (
    <div className="row col-md-12">
      <div id="messages-form" className="col-md-6 mdl-card mdl-shadow--2dp">
        <div className="mdl-card__supporting-text mdl-color-text--grey-600">
          Comment on the issue at hand!
          <form id="message-form" action="#" onSubmit={(e) => this.submitComment(e)}>
            <div className="row">
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label
                col-md-6">

                <input className="mdl-textfield__input" type="text" id="message" />
                <label className="mdl-textfield__label" htmlFor="message">I like how you phrased that...</label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <button id="submit" form="message-form" className="mdl-button submit-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
                  Send
                </button>
              </div>
            </div>
          </form>
          <form id="image-form" action="#">
          </form>
        </div>
      </div>
      <div id="messages-form" className="col-md-6 mdl-card mdl-shadow--2dp">
        <div className="mdl-card__supporting-text mdl-color-text--grey-600">
          To participate, submit an interest statement
          <form>
            <div className="row">
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label
                col-md-6">

                <input className="mdl-textfield__input" type="text" id="message" />
                <label className="mdl-textfield__label" htmlFor="message">I am interested in....</label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <button id="submit" form="message-form" className="mdl-button submit-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
  }
}
