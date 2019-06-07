import React, { Component } from 'react';
import { Header, Form, Grid, Button } from 'semantic-ui-react';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import Tickets from '../../modules/ticketManager';

export default class TicketForm extends Component {
  //reference to dicterory in bucket
  storageRef = firebase.storage().ref("ticketsImages");

  state = {
    userId: '',
    classId: '',
    ticketComplete: '',
    ticketTitle: '',
    ticketBody: '',
    submitTime: '',
    linked: '',
    solutionNotes: '',
    photo: null
  };

  // saveTicket = () => {
  //   //refence to an image in bucket about to be saved 
  //   const ref = this.storageRef.child(`${Date.now()}`)
  //   //uploads to firebase
  //   ref.put(this.state.photo)
  //     //gets image name that was uploaded
  //     .then(data => data.ref.getDownloadURL())
  //     .then(console.log(`success`))
  //     .then(url => {
  //       Tickets.saveTicket({
  //         userId: this.state.userId,
  //         classId: this.state.classId,
  //         ticketComplete: this.state.ticketComplete,
  //         ticketTitle: this.state.ticketTitle,
  //         ticketBody: this.state.ticketBody,
  //         submitTime: this.state.submitTime,
  //         linked: this.state.linked,
  //         solutionNotes: this.state.solutionNotes,
  //         photo: url
  //       })
  //     })
  // }

  render() {
    return (
      <div className="current-ticket">
        <Header>
          Current ticket will be rendered here
        </Header>
      </div>
    )
  }
}