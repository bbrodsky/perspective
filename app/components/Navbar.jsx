import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { connect } from 'react-redux';


class Login extends Component {

  render() {
    return (
      <FlatButton onTouchTap={this.props.signInGoog} label="Login" />
    );
  }
}

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem onTouchTap={props.signOut} primaryText="Sign out" />
  </IconMenu>
);

class AppBarExampleComposition extends Component {

  constructor(props) {
    super(props);
    // this.signInFB = this.signInFB.bind(this)
    this.signInGoog = this.signInGoog.bind(this)
    this.signOut = this.signOut.bind(this)
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
    return (
      <div>
        <AppBar
          title="Perspective"
          iconElementRight={this.props.user.displayName ?
            <Logged signOut={this.signOut} />
            :
            <Login signInGoog={this.signInGoog} />
          }
        />
      </div>
    );
  }
}
const mapStateToProps = ({ firebase, user }) => ({ firebase, user })

export default connect(mapStateToProps)(AppBarExampleComposition);

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import AppBar from 'material-ui/AppBar';



// class Navbar extends Component {
//   constructor(props) {
//     super(props);
//     this.signInFB = this.signInFB.bind(this)
//     this.signInGoog = this.signInGoog.bind(this)
//     this.signOut = this.signOut.bind(this)
//   }

//   signInFB() {
//     const { firebase } = this.props
//     let provider = new firebase.auth.FacebookAuthProvider();
//     firebase.auth().signInWithPopup(provider)
//     .catch(console.error);
//   }



// <div id="navbar">
//   <p>Perspective</p>
//   {user.displayName ?
//     <div>
//       <p>you are logged in as: {user.displayName}</p>
//       <button onClick={this.signOut}>log out bro</button>
//       <img className="swag" src={user.photoURL} />
//     </div>
//     :
//     <button onClick={this.signInGoog}>log in bro</button>}

// </div>
