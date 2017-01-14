import React, { Component } from 'react';
import { connect } from 'react-redux';



class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props

    return (
    <div>
    {user && user.displayName ?
    <div>
      <p>you are logged in as: {user.displayName}</p>
      <img className="swag" src={user.photoURL} />
    </div>
    :
    <p>You are not logged in</p>}
    </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user })



export default connect(mapStateToProps, null)(Home);
