import React, { Component } from 'react';
import { connect } from 'react-redux';
import {setLinks} from '../reducers/databox'
import store from '../store'



class Databox extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.firebase.database().ref('issue/'+this.props.issue).on('value', snapshot => {
      if(!snapshot) return;
      store.dispatch(setLinks(snapshot.val()));
    })
  }



  render() {
    const { firebase, databox } = this.props;

    return (
        <div className="row">
          {Object.keys(databox).length && Object.keys(databox).map((linkId) => {
            return (
              <div>
                <a href={databox[linkId].link}>{databox[linkId].description}</a>
              </div>
            )

          })}
        </div>
    )
  }
}

const mapStateToProps = ({ firebase, databox }) => ({ firebase, databox} )



export default connect(mapStateToProps, null)(Databox);
