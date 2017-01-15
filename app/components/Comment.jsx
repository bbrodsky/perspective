import React, { Component } from 'react';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.upVote = this.upVote.bind(this)
    this.downVote = this.downVote.bind(this)
  }

  upVote(messageId, score) {
    this.props.firebase.database().ref('messages').child(messageId).child('score').set(score + 1)
  }

  downVote(messageId, score) {
    this.props.firebase.database().ref('messages').child(messageId).child('score').set(score - 1)
  }

  render(){
    const { message, userName } = this.props;
    const { score, id, text } = message
    const buttonStyle = {paddingTop: '20px'}
    const iconStyle = {fontSize: '30px'};
    return (
    <div className="row">
      <div className="messages-card mdl-card mdl-shadow--2dp col-md-12">
        <div className="mdl-card__supporting-text">
          <div className="userName">
            { userName }:
          </div>
          <div className="messages">
            { text }
          </div>
          <IconButton style={buttonStyle} iconStyle={iconStyle} iconClassName="zmdi zmdi-thumb-up zmdi-hc-3x" onTouchTap={() => this.upVote(id, score)} />
          <IconButton style={buttonStyle} iconStyle={iconStyle} iconClassName="zmdi zmdi-thumb-down zmdi-hc-3x" onTouchTap={() => this.downVote(id, score)} />
          <p>Score: {score}</p>
        </div>
      </div>
    </div>
    )
  }
}
