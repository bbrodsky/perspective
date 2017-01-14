import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import TwilioVideo from '../../node_modules/twilio-video/dist/twilio-video.min.js';

class Home extends Component {
  constructor(props) {
    super(props);
    this.roomName = props.params.splat;
    this.room;
    this.state = {
      participantOne: '',
      participantTwo: '',
      mod: '',
      viewers: [],
      isAdmin: false,
      error: ''
    };
    this.updateDiscussion = this.updateDiscussion.bind(this);
  }

  componentDidMount() {
    // Check for WebRTC on browser
    if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
      return this.setState({ error: 'Your browser does not support live video' });
    }
    // Admins WhiteList
    this.props.firebase.database().ref('admin').once('value', snapshot => {
      // check if user is administrator
      const admins = snapshot && snapshot.val();
      const isAdmin = admins[this.props.user.uid] ? true : false

      if (isAdmin) {
        this.setState({ isAdmin: true })
      }
      // Get Twilio token
      axios.get(`/api/twilio/token?userid=${this.props.user.uid}`)
      .then(({ data }) => {
        // Connect user video to Twilio
        const videoClient = new TwilioVideo.Client(data.token);
        videoClient.connect({ to: this.roomName })
        .then(room => {
          this.room = room;
          room.on('participantConnected', participant => {
            console.log(participant)
          });
          // subscribe to discussion changes
          this.props.firebase.database().ref('discussion').on('value', this.updateDiscussion)

          // if admin, attach to moderator circle
          if (this.isAdmin) {
            this.props.firebase.database().ref('discussion').set({
              mod: this.props.user.uid
            })
          }
        })
        .catch(err => {
          throw err;
        })
      })
      .catch(err => {
        return this.setState({ error: 'Could not connect' });
      });
    });
  }

  updateDiscussion(snapshot) {
    let discussion = snapshot.val(),
        participants;
    if (discussion.mod !== this.state.mod) {
      participants = this.room.participants;
      for (let i = 0; i < participants.length; i++) {
        if (participants[i].identity === dicussion.mod) {
          participant[i].attach('#moderator');
          this.setState({ mod: discussion.mod});
          break
        }
      }
    }
  }

    // else {  // assume local participant
    //   room.localParticipant.media.attach('#participant-one');
    // }
    //
    // room.on('participantConnected', (participant) => {
    //   participant.media.attach('#participant-two');
    //   room.participants.forEach(part => console.log(part.identity));
    // })
    // room.on('participantDisconnected', (participant) => {
    //   participant.media.detach();
    // })
    //
    // room.on('disconnected', () => {
    //   room.localParticipant.media.detach();
    // })

  // chooseParticipantOne() {
  //   console.log('part1')
  // }
  //
  // chooseParticipantTwo() {
  //   console.log('part2')
  // }

  componentWillUnmount() {
    this.room.disconnect();
    firebase.database().ref('discussion').off();
  }

  render() {
    return (
      <div>
        <div id="participant-one"/>
        <div id="moderator"/>
        <div id="participant-two"/>
        <div id="admin-console">

        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user,  // displayName & uid
  firebase: state.firebase
})

export default connect(mapState)(Home);
