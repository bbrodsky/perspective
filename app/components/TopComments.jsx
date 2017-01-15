import React, { Component } from 'react';
import Comment from './Comment.jsx';

export default class TopComments extends Component {
  render() {
    const { comments, firebase } = this.props
    return (
      <div>
      <h4>Top Comments</h4>
      {comments.length && comments.map((comment, index) => {
        return (
          <Comment key={index} firebase={firebase} message={comment} userName={comment.name} />
        )
      })}
      </div>
    )
  }
}
