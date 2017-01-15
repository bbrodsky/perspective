import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentForm from './CommentForm.jsx';
import TopComments from './TopComments.jsx';
import Comment from './Comment.jsx';
import FlipMove from 'react-flip-move';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.renderRecentComments = this.renderRecentComments.bind(this);
    this.renderTopComments = this.renderTopComments.bind(this);
  }

  renderRecentComments(){
    const { messages, firebase} = this.props;
    var commentArray = Object.keys(messages).map(function (key) {
      let msg = messages[key];
      msg.id = key
      return msg;
    });

    commentArray = commentArray.slice(commentArray.length-6).reverse();

    if (!commentArray) return;
    return commentArray.map((comment, index) => (
        <Comment key={index} firebase={firebase} message={comment} userName={comment.name} />
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

    return <TopComments comments={topRated} firebase={firebase}/>
  }

  render() {
    const { firebase } = this.props;
    //
    // var commentArray = Object.keys(messages).map(function (key) {
    //   let msg = messages[key];
    //   msg.id = key
    //   return msg;
    // });
    //
    // let duplicate = Object.assign([], commentArray)
    // let topRated = duplicate.sort((a, b) => b.score - a.score).slice(0,6)
    //
    // commentArray = commentArray.slice(commentArray.length-6).reverse();

    return (
    <div className="row">
      <div className="col-sm-12">
        <div className="row">
          {firebase ? <CommentForm firebase={firebase}/> : null}
        </div>
        <div className="row">
          <div className="col-md-6">
            {/* <TopComments comments={topRated} firebase={firebase}/> */}
            <FlipMove easing="ease" style={{width: '100%'}}>
              { this.renderTopComments() }
            </FlipMove>
          </div>
          <div className="col-md-6">
          <h4>Recent Comments</h4>
          <FlipMove easing="ease" style={{width: '100%'}}>
            { this.renderRecentComments() }
          </FlipMove>
          {/* {commentArray.length && commentArray.map((comment, index) => {
            return (
              <Comment key={index} firebase={firebase} message={comment} userName={comment.name} />
            )
          })} */}
          </div>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = ({ firebase, messages }) => ({ firebase, messages })

export default connect(mapStateToProps, null)(Chat);
