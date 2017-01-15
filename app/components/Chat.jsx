import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentForm from './CommentForm.jsx';
import TopComments from './TopComments.jsx';
import Comment from './Comment.jsx';
import FlipMove from 'react-flip-move';

class Chat extends Component {
  constructor(props) {
    super(props);
  }



  renderRecentComments(){
    const { messages, firebase } = this.props;
    var commentArray = Object.keys(messages).map(function (key) {
      let msg = messages[key];
      msg.id = key
      return msg;
    });

    commentArray = commentArray.slice(commentArray.length-6).reverse();

    if (!commentArray) return;
    return commentArray.map(comment => (
          <Comment key={comment.id} firebase={firebase} message={comment} userName={comment.name} />
      )
    )
  }

  renderTopComments(){
    const { messages, firebase } = this.props;
    var topCommentArray = Object.keys(messages).map(function (key) {
      let msg = messages[key];
      msg.id = key
      return msg;
    });
    let topRated = topCommentArray.sort((a, b) => b.score - a.score).slice(0,6);

    if (!topRated) return;

    return topRated.map(comment => (
            <Comment key={comment.id} firebase={firebase} message={comment} userName={comment.name} />
        ))
  }

  render() {
    const { messages, firebase, user } = this.props;

    return (
    <div className="row">
      <div className="col-sm-12">
        <div className="row">
          {firebase && user.displayName ? <CommentForm firebase={firebase}/> : null}
        </div>
        <div className="row">
          <div className="col-md-6">
            <h4>Top Comments</h4>
            <FlipMove easing="ease">
              { this.renderTopComments() }
            </FlipMove>
          </div>
          <div className="col-md-6">
            <h4>Recent Comments</h4>
            <FlipMove easing="ease">
              { this.renderRecentComments() }
            </FlipMove>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = ({ firebase, messages, user }) => ({ firebase, messages, user })

export default connect(mapStateToProps, null)(Chat);
