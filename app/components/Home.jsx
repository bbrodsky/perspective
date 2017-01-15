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
      <Chat />
    </div>

    )
  }
}

const mapStateToProps = ({ user }) => ({ user })



export default connect(mapStateToProps, null)(Home);
