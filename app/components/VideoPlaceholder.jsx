import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import TwilioVideo from '../../node_modules/twilio-video/dist/twilio-video.min.js';
import Paper from 'material-ui/Paper'

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewers: []
    };

    this.setRole = this.setRole.bind(this);
    this.attachRemotes = this.attachRemotes.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/twilio/token?userid=${this.props.user.uid}`)
    .then(({ data }) => {
      // Connect user video to Twilio
      const videoClient = new TwilioVideo.Client(data.token);
      videoClient.connect({ to: 'perspective' })
      .then(this.setRole)
      .catch(err => {
        throw err;
      })
    })
    .catch(err => {
      return this.setState({ error: 'Could not connect' });
    });
  }

  setRole(room) {
    const userid = this.props.user.uid;
    const firebase = this.props.firebase;

    // get current viewers from database
    firebase.database().ref('discussion').once('value', snapshot => {
      const mod = snapshot && snapshot.val().mod;
      const rightParticipant = snapshot && snapshot.val().rightParticipant;
      const leftParticipant = snapshot && snapshot.val().leftParticipant;
      const viewers = snapshot && snapshot.val().viewers;
      // then make updates to viewers & appropriate other prop on discussion object
      // if admin, attach to moderator circle
      if (!mod) {
        room.localParticipant.media.attach('#moderator');
        firebase.database().ref('discussion').update({
          mod: userid,
          viewers: [ ...viewers, userid ],
        })
      }
      // else, check if left participant
      else if (!leftParticipant) {
        room.localParticipant.media.attach('#left-participant');
        firebase.database().ref('discussion').update({
          leftParticipant: userid,
          viewers: [ ...viewers, userid ],
        })
      }
      // else, check right
      else if (!rightParticipant) {
        room.localParticipant.media.attach('#right-participant');

        firebase.database().ref('discussion').update({
          rightParticipant: userid,
          viewers: [ ...viewers, userid ],
        })
      } else {
        firebase.database().ref('discussion').update({
          viewers: [ ...viewers, userid ]
        })
      }
    return this.attachRemotes(room, mod, rightParticipant, leftParticipant);
    })

  }

  attachRemotes(room) {
    room.on('participantConnected', participant => {
      if (!rightParticipant) {
        participant.media.attach('#right-participant');
        console.log('setting right participant')
      }
      else if (!leftParticipant) {
        participant,media.attach('#left-participant');
        console.log('setting left participant')
      }
      else if (!moderator) {
        participant.media.attach('#moderator');
        console.log('setting moderator')
      }
    })
  }

  render() {

    const participantStyle = {
      height: '275px',
      width: '375px',
      margin: '20px',
      textAlign: 'center',
      display: 'inline-block',
      backgroundColor: 'black'
    };
    const moderatorStyle = {
      height: '150px',
      width: '160px',
      margin: '10px',
      textAlign: 'center',
      display: 'inline-block',
      backgroundColor: 'black'
    };
    // const vidTextStyle = {
    //
    // }

    return (
      <div>
        <Paper style={ participantStyle } zDepth={1} rounded={true} id="left-participant">
          {/*<span style={ vidTextStyle }></span>*/}
        </Paper>
        <Paper style={ moderatorStyle } zDepth={1} rounded={true} id="moderator"/>
        <Paper style={ participantStyle } zDepth={1} rounded={true} id="right-participant">
          {/*<span style={ vidTextStyle }></span>*/}
        </Paper>
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user,          // displayName & uid
  firebase: state.firebase
})

export default connect(mapState)(Video);
