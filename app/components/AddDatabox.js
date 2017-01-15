import React, { Component } from 'react';
import { connect } from 'react-redux';


class AddDatabox extends Component {
  constructor(props) {
    super(props);
    this.submitLink.bind(this)
  }


    submitLink(event){
      const { firebase } = this.props;
      const auth = firebase.auth();
      event.preventDefault();
      firebase.database().ref('issue/'+event.target.issue.value).push({
        description: event.target.description.value,
        link: event.target.link.value
      })
      event.target.issue.value = '';
      event.target.description.value = '';
      event.target.link.value = '';
    }

  render() {

    return (
      <div>
        <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">

          <main className="mdl-layout__content mdl-color--grey-100">
            <div id="messages-card-container" className="mdl-cell mdl-cell--12-col mdl-grid">


      <div id="messages-card" className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--6-col-tablet mdl-cell--6-col-desktop">
        <div className="mdl-card__supporting-text mdl-color-text--grey-600">
          <div id="messages">
            <span id="message-filler"></span>
          </div>
          <form id="message-form" action="#" onSubmit={(e) => this.submitLink(e)}>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="issue" />
              <label className="mdl-textfield__label" htmlFor="issue">Issue</label>
            </div>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="description" />
              <label className="mdl-textfield__label" htmlFor="description">Description</label>
            </div>

            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="link" />
              <label className="mdl-textfield__label" htmlFor="link">Link...</label>
            </div>
            <button id="submit" type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div id="must-signin-snackbar" className="mdl-js-snackbar mdl-snackbar">
        <div className="mdl-snackbar__text"></div>
        <button className="mdl-snackbar__action" type="button"></button>
      </div>

    </div>
  </main>
</div>
</div>
    )
  }
}

const mapStateToProps = ({ firebase }) => ({ firebase })



export default connect(mapStateToProps, null)(AddDatabox);
