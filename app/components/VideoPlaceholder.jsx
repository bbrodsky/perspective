import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import TwilioVideo from '../../node_modules/twilio-video/dist/twilio-video.min.js';
import Paper from 'material-ui/Paper'

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftParticipant: '',
      rightParticipant: '',
      admin: '',
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

    // subscribe to discussion changes
    firebase.database().ref('discussion').on('value', this.updateDiscussion)

    // get current viewers from database
    firebase.database().ref('discussion').child('viewers').once('value', snapshot => {
      const viewers = snapshot && snapshot.val();
      // then make updates to viewers & appropriate other prop on discussion object
      // if admin, attach to moderator circle
      if (!this.state.admin) {
        room.localParticipant.media.attach('#moderator');
        firebase.database().ref('discussion').update({
          admin: userid,
          viewers: [ ...viewers, userid ],
        })
        this.setState({ admin: userid });
      }
      // else, check if left participant
      else if (!this.state.leftParticipant) {
        room.localParticipant.media.attach('#left-participant');
        firebase.database().ref('discussion').update({
          leftParticipant: userid,
          viewers: [ ...viewers, userid ],
        })
        this.setState({ leftParticipant: userid })
      }
      // else, check right
      else if (!this.state.rightParticipant) {
        room.localParticipant.media.attach('#right-participant');

        firebase.database().ref('discussion').update({
          rightParticipant: userid,
          viewers: [ ...viewers, userid ],
        })
        this.setState({ rightParticipant: userid })
      } else {
        firebase.database().ref('discussion').update({
          viewers: [ ...viewers, userid ]
        })
      }
    })

    return this.attachRemotes(room);
  }

  attachRemotes(room) {
    const firebase = this.props.firebase;

    firebase.database().ref('discussion').once('value', snapshot => {
      const rightParticipant = snapshot.val().rightParticipant;
      const leftParticipant = snapshot.val().leftParticipant;
      const moderator = snapshot.val().leftParticipant;

      room.participants.forEach(participant => {
        if (participant.identity === rightParticipant) {
          participant.media.attach('#rightParticipant');
        }
        else if (participant.identity === leftParticipant) {
          participant,media.attach('#leftParticipant');
        }
        else if (participant.identity === moderator) {
          participant.media.attach('#moderator');
        }
      })
    })
    return this.setState( {
      rightParticipant, leftParticipant, moderator
    });
  }

  render() {

    const participantStyle = {
      height: '275',
      width: '375',
      margin: '20',
      textAlign: 'center',
      display: 'inline-block',
      backgroundColor: 'black'
    };
    const moderatorStyle = {
      height: '150',
      width: '150',
      margin: '20',
      textAlign: 'center',
      display: 'inline-block',
      backgroundColor: 'black'
    };
    // const vidTextStyle = {
    //
    // }

    return (
      <div class="video-component">
        <Paper style={ participantStyle } zDepth={1} rounded={false} id="left-participant">
          {/*<span style={ vidTextStyle }></span>*/}
        </Paper>
        <Paper style={ moderatorStyle } zDepth={1} circle={true} id="moderator"/>
        <Paper style={ participantStyle } zDepth={1} rounded={false} id="right-participant">
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
