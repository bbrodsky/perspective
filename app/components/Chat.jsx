import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentForm from './CommentForm.jsx';
import Comment from './Comment.jsx';
// import {FriendlyChat} from './friendlyChat'


class Chat extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  }

  render() {
    const { firebase } = this.props
        // console.log(window.firebase, "//", window)
    window.firebase = firebase;

    return (
    <div>
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">

        <main className="mdl-layout__content mdl-color--grey-100">
          <div id="messages-card-container" className="mdl-cell mdl-cell--12-col mdl-grid">

          <CommentForm />

          <Comment />

          {/* <div className="mdl-card__supporting-text mdl-color-text--grey-600"> */}

            <div id="must-signin-snackbar" className="mdl-js-snackbar mdl-snackbar">
              <div className="mdl-snackbar__text"></div>
              <button className="mdl-snackbar__action" type="button"></button>
            </div>

          </div>
        </main>
 </div>
</div>
    )
  }
}

const mapStateToProps = ({ firebase }) => ({ firebase })



export default connect(mapStateToProps, null)(Chat);
