import React, { Component } from 'react';
import { connect } from 'react-redux';


class Landing extends Component {
  constructor(props) {
    super(props);
    this.signInGoog = this.signInGoog.bind(this);
    this.signInFb = this.signInFb.bind(this);
  }

  signInGoog() {
    const { firebase } = this.props
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .catch(console.error);
  }

  signInFb() {
    const { firebase } = this.props
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .catch(console.error);
  }

  render() {
    const { user } = this.props

    return (
    <div className="container">
      <h1>whattup</h1>
      <button onClick={this.signInGoog}>Sign In Google</button>
      <button onClick={this.signInFb}>Sign In FB</button>
    </div>

    )
  }
}

const mapStateToProps = ({ user, firebase }) => ({ user, firebase })



export default connect(mapStateToProps, null)(Landing);
