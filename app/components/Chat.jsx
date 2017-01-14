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
    var commentArray = Object.keys(messages).map(function (key) { return messages[key]; });
    commentArray = commentArray.slice(commentArray.length-8);
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
              <Comment key={index} messageText={comment.text} userName={comment.name}/>
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
