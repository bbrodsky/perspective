import React, { Component } from 'react';
import { connect } from 'react-redux';



class Navbar extends Component {
  constructor(props) {
    super(props);
    this.signInFB = this.signInFB.bind(this)
    this.signInGoog = this.signInGoog.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  signInFB() {
    const { firebase } = this.props
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .catch(console.error);
  }

  signInGoog() {
    const { firebase } = this.props
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .catch(console.error);
  }

  signOut() {
    const { firebase } = this.props
    firebase.auth().signOut()
  }

  render() {
    const { firebase, user } = this.props

    return (
      <div>
        <h1>NAVBAR BOSS</h1>
        {user.displayName ?
          <div>
            <p>you are logged in as: {user.displayName}</p>
            <button onClick={this.signOut}>log out bro</button>
          </div>
          :
          <button onClick={this.signInGoog}>log in bro</button>}

      </div>
    )
  }
}

const mapStateToProps = ({ firebase, user }) => ({ firebase, user })



export default connect(mapStateToProps, null)(Navbar);
