import React, { Component } from 'react';
import axios from 'axios';
import TwilioVideo from '../../node_modules/twilio-video/dist/twilio-video.min.js';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.room = '123';
    this.state = {
      identity: '',
      activeRoom: '',
      error: ''
    }
  }

  componentDidMount() {
    // Check for WebRTC on browser
    if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
      this.setState({ error: 'Your browser does not support live video' });
    }

    // Get Twilio token
    axios.get('/api/twilio/token')
      .then(({ data }) => {
        const identity = data.identity;

        // Connect user video to Twilio
        const videoClient = new TwilioVideo.Client(data.token);
        videoClient.connect({ to: this.room })
          .then(this.joinedRoom)
          .catch(err => {
            throw err;
          })
      })
      .catch(err => {
        this.setState({ error: 'Could not auth Twilio' });
      });
  }

  joinedRoom(room) {
    room.localParticipant.media.attach('#local-video');

    console.log('participants:', room.participants);
    room.on('participantConnected', (participant) => {
      participant.media.attach('#peer-video');
      room.participants.forEach(part => console.log(part.identity));
    })
    room.on('participantDisconnected', (participant) => {
      participant.media.detach();
    })

    room.on('disconnected', () => {
      room.localParticipant.media.detach();
    })
  }

  componentWillUnmount() {
    if (this.state.activeRoom) {
      this.state.activeRoom.disconnect();
    }
  }

  render() {
    return (
      <div>
        <div id="local-video"/>
        <div id="peer-video"/>
      </div>
    )
  }
}

    // const videoEl = document.querySelector('#video');

    // this.connection = new RTCMultiConnection('123');
    // this.connection.session = {
    //   audio: true,
    //   video: true
    // };
    // this.connection.onstream = (e) => {
    //   console.log('Joined!!!')
    //   videoEl.appendChild(e.mediaElement)
    // }
    // this.connection.onNewSession = (session) => {
    //   console.log('new session')
    //   session.openOrJoin(this.connection.channel);
    // }
    // this.connection.connect(this.connection.channel);