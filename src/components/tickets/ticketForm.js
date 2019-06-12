import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Header, Form, Grid, Button, Message } from 'semantic-ui-react';
import moment from 'moment';
import Tickets from '../../modules/ticketManager';

const displayStyle = {
  display: "none"
}

const FormSuccess = () => (
  <Form style={ displayStyle } className="ticketFormSuccess" success >
    <Message success header='Form Completed' content="Your ticket is now in queue" />
  </Form >
)

class TicketForm extends Component {

  newTicket = () => {
    Tickets.saveTicket({
      userId: this.props.activeUser.id,
      classId: this.props.activeUser.classId,
      ticketComplete: false,
      ticketTitle: this.state.ticketTitle,
      ticketBody: this.state.ticketBody,
      submitTime: moment(new Date()).format('llll'),
      open: true,
      linked: false,
      solutionNotes: null
    })
      .then(() => {
        setTimeout(() => {
          document.querySelector(".ticketFormSuccess").style.display = "block";
          document.querySelector(".form-fields").reset()
        }, 200)
      })
      .then(() => { setTimeout(() => { this.props.history.push("/tickets/my-tickets") }, 2000) })
  }

  render() {
    return (
      <div className="new-ticket-list">
        <Header>
          <h1>Submit a New Ticket</h1>
        </Header>
        <Grid>
          <Grid.Row centered>
            <Grid.Column computer={ 5 }>
              <Form className="form-fields" onSubmit={ this.newTicket }>
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
                  onChange={ (e) => this.setState({ ticketBody: e.target.value }) }
                  placeholder="Ticket Body" />
                <Button className="btn-margin" type="submit" content="Save" basic color="black" floated="right" />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <FormSuccess />
      </div>
    )
  }
}

export default withRouter(TicketForm)