import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentForm from './CommentForm.jsx';
import Comment from './Comment.jsx';

class Chat extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(){
  }

  render() {
    const { messages } = this.props;
    var commentArray = Object.keys(messages).map(function (key) { return messages[key]; });
    commentArray = commentArray.slice(commentArray.length-6);
    console.log("M", commentArray)

    return (
    <div>
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">

        <main className="mdl-layout__content mdl-color--grey-100">
          <div id="messages-card-container" className="mdl-cell mdl-cell--12-col mdl-grid">

          <CommentForm />

          {commentArray.length && commentArray.map((comment, index) => {
            return (
              <Comment key={index} messageText={comment.text} userName={comment.name}/>
            )
          })}

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

const mapStateToProps = ({ firebase, messages }) => ({ firebase, messages })



export default connect(mapStateToProps, null)(Chat);
