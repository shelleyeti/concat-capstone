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

  saveTicket = () => {
    //refence to an image in bucket about to be saved 
    const ref = this.storageRef.child(`${Date.now()}`)
    //uploads to firebase
    ref.put(this.state.photo)
      //gets image name that was uploaded
      .then(data => data.ref.getDownloadURL())
      .then(console.log(`success`))
      .then(url => {
        Tickets.saveTicket({
          userId: this.state.userId,
          classId: this.state.classId,
          ticketComplete: this.state.ticketComplete,
          ticketTitle: this.state.ticketTitle,
          ticketBody: this.state.ticketBody,
          submitTime: this.state.submitTime,
          linked: this.state.linked,
          solutionNotes: this.state.solutionNotes,
          photo: url
        })
      })
  }

  render() {
    return (
      <div className="image-form--container">
        <Header>
          Submit a New Ticket
        </Header>
        <Grid>
          <Grid.Row centered>
            <Grid.Column largeScreen={ 4 } computer={ 6 } tablet={ 8 } mobile={ 12 }>
              <Form onSubmit={ this.saveTicket }>
                <Form.Field
                  control="input"
                  type="text"
                  label="Ticket Title"
                  onChange={ (e) => this.setState({ ticketTitle: e.target.value }) }
                  placeholder="Ticket Title" />
                <Form.Field
                  control="textarea"
                  type="text"
                  label="Ticket Body"
                  onChange={ (e) => this.setState({ about: e.target.value }) }
                  placeholder="Ticket Body" />
                {/* <Form.Field
                  control="input"
                  type="file"
                  label="photo"
                  //files don't use .value and come through as an array
                  onChange={ (e) => this.setState({ photo: e.target.files[0] }) }
                  placeholder="Photo" /> */}
                <Button type="submit" content="Save" color="purple" />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}