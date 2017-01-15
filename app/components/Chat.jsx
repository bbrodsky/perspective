import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentForm from './CommentForm.jsx';
import Comment from './Comment.jsx';

class Chat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { messages, firebase } = this.props;

    var commentArray = Object.keys(messages).map(function (key) {
      let msg = messages[key];
      msg.id = key
      return msg;
    });

    commentArray = commentArray.slice(commentArray.length-8).reverse();
    console.log("M", commentArray, firebase)

    return (
    <div className="row">
      <div className="col-sm-12">
        <div className="row">
          {firebase ? <CommentForm firebase={firebase}/> : null}
        </div>
        <div className="row">
          {commentArray.length && commentArray.map((comment, index) => {
            return (
              <Comment key={index} firebase={firebase} message={comment} userName={comment.name} />
            )
          })}
          </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = ({ firebase, messages }) => ({ firebase, messages })



export default connect(mapStateToProps, null)(Chat);
