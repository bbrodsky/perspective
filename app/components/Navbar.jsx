import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
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

    const { user } = this.props
    const userTabStyle = { padding: "10px", color: "white" }
    const loginElementStyle = { paddingTop: "5px", paddingBottom: "5px" }
    const userTab = (
        <div style={ loginElementStyle }>
          <Avatar src= { user.photoURL } />
          <span style={ userTabStyle }>Welcome, {user.displayName}</span>
          <Logged signOut={this.signOut} />
        </div>
    )


    return (
      <div>
        <AppBar
          title="Perspective"
          iconElementRight={user.displayName ?
            userTab
            :
            <Login signInGoog={this.signInGoog} />
          }/>
      </div>
    );
  }
}

const mapStateToProps = ({ firebase, user }) => ({ firebase, user })

export default connect(mapStateToProps)(AppBarExampleComposition);
