import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chat from './Chat'
import Video from './VideoPlaceholder'
import Navbar from './Navbar'


class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props

    return (
    <div>
    <Navbar/>
      <div className="container">
        <Video />
        <Chat />
      </div>
    </div>

    )
  }
}

const mapStateToProps = ({ user }) => ({ user })



export default connect(mapStateToProps, null)(Home);
