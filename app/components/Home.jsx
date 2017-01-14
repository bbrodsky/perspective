import React, { Component } from 'react';
import { connect } from 'react-redux';



class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { firebase } = this.props

    return (
      <div>
        <h2>Template Ready.</h2>
        <p>Add new pages using react-router, change the Redux state, and make this app your own!</p>
        <p>CURRENT STATE: { example }</p>
        <button onClick={() => firebase.database().ref("TEST").set("STRING")}>Update</button>
      </div>
    )
  }
}

const mapStateToProps = ({ firebase }) => ({ firebase })



export default connect(mapStateToProps, null)(Home);
