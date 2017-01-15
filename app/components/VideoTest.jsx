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
      leftParticipant: '',
      rightParticipant: '',
      mod: '',
      viewers: [],
      isAdmin: false,
      error: ''
    };
    this.updateDiscussion = this.updateDiscussion.bind(this);
    this.onNominate = this.onNominate.bind(this);
    this.modNominate = this.modNominate.bind(this);
  }

  componentDidMount() {
    // Check for WebRTC on browser
    if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
      return this.setState({ error: 'Your browser does not support live video' });
    }

    // Connect the user's socket for possible invites in future
    this.socket = io.connect();
    this.socket.emit('userEnter', { room: this.roomName });
    this.socket.on('nominated', this.onNominate);

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

          // subscribe to discussion changes
          this.props.firebase.database().ref('discussion').on('value', this.updateDiscussion)

          // if admin, attach to moderator circle
          if (isAdmin) {
            this.room.localParticipant.media.attach('#moderator');
            this.props.firebase.database().ref('discussion').set({
              mod: this.props.user.uid,
              leftParticipant: '',
              rightParticipant: '',
              viewers: [ this.props.user.uid ],
              topic: ''
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

  // Triggered when discussion in Firebase is updated
  updateDiscussion(snapshot) {
    const discussion = snapshot.val();
    console.log('updated:', discussion)

    // If person has changed, attach new person to view
    const personChange = (role, div) => {
      if (discussion[role] !== this.state[role]) {
        const partIter = this.room.participants.entries();
        let curPart = partIter.next();
        while (!curPart.done) {
          if (curPart.value[1].identity === discussion[role]) {
            console.log(curPart.value[1])
            curPart.value[1].media.attach(`#${div}`);
            let newState = {};
            newState[role] = discussion[role];
            this.setState(newState);
            break;
          }
          curPart = partIter.next();
        }
      }
    }

    // Check for person updates
    personChange('mod', 'moderator');
    personChange('rightParticipant', 'right-participant');
    personChange('leftParticipant', 'left-participant');
  }

  modNominate(uid, side) {
    this.socket.emit('nominate', { room: this.roomName, side: 'left', uid })
  }

  // Handle socket notification that new discussion participant was nominated
  onNominate({ uid, side }) {
    console.log('on nominate received')
    // If current user was nominated, attach media and dispatch Firebase update
    if (uid === this.props.user.uid) {
      this.room.localParticipant.media.attach(`#${side}-participant`);
      let newDiscussion = {};
      newDiscussion[`${side}Participant`] = this.props.user.uid;
      this.props.firebase.database().ref('discussion').update(newDiscussion);
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

  componentWillUnmount() {
    this.room.disconnect();
    firebase.database().ref('discussion').off();
    this.socket.emit('userLeave', { room: this.roomName });
  }

  render() {
    return (
      <div>
      { // Display possible error with WebRTC or Twilio
        this.state.error ?
          <p>{ this.state.error }</p> : null
      }
        <div id="left-participant"/>
        <div id="moderator"/>
        <div id="right-participant"/>
        <div id="admin-console">
        <button id="nominate" onClick={ () => this.modNominate('BAFxkHMbgTUwKQtWimEyR6ftly92') }>Nominate</button>
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
