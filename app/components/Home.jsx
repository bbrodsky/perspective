import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chat from './Chat'



class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props

    return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="vbox"></div>
        </div>
        <div className="col-md-6">
          <div className="vbox"></div>
        </div>
      </div>
        {user && user.displayName ?
        <div className="row">
          <div className="col-md-6">
            <p>you are logged in as: {user.displayName}</p>
          </div>
          <div className="col-md-6">
            <img className="swag" src={user.photoURL} />
          </div>
        </div>
        :
        <p>You are not logged in</p>}
      <div className="row">
        <h1> flying links section</h1>
      </div>
      <Chat />
    </div>

    )
  }
}

const mapStateToProps = ({ user }) => ({ user })



export default connect(mapStateToProps, null)(Home);
