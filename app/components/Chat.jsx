import React, { Component } from 'react';
import { connect } from 'react-redux';
import {FriendlyChat} from './friendlyChat'


class Chat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { firebase } = this.props
    window.firebase = firebase;
    window.friendlyChat = new FriendlyChat();
    return (
      <div>
        <h2>Chat!</h2>
        <p>Add new pages using react-router, change the Redux state, and make this app your own!</p>
        <p>CURRENT STATE: TBD</p>
        {/* <button onClick={() => firebase.database().ref("User").set("Comment")}>Comment</button> */}
      </div>
    )
  }
}

const mapStateToProps = ({ firebase }) => ({ firebase })



export default connect(mapStateToProps, null)(Chat);
