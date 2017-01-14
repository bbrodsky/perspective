import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class Comment extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div id="messages-card" className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--6-col-tablet mdl-cell--6-col-desktop">
        <div className="mdl-card__supporting-text mdl-color-text--grey-600">
          <div id="messages">
            <span id="message-filler"></span>
          </div>
        </div>
      </div>
    )
  }
}
