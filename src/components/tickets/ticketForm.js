import React, { Component } from 'react';
import { Header, Form, Grid, Button } from 'semantic-ui-react';
import moment from 'moment';
import Tickets from '../../modules/ticketManager';

export default class TicketForm extends Component {

  newTicket = () => {
    Tickets.saveTicket({
      userId: this.props.userId,
      classId: this.props.classId,
      ticketComplete: false,
      ticketTitle: this.state.ticketTitle,
      ticketBody: this.state.ticketBody,
      submitTime: moment(new Date()).format('llll'),
      open: true,
      linked: false,
      solutionNotes: null
    })
  }

  render() {
    return (
      <div className="new-ticket-list">
        <Header>
          Submit a New Ticket
        </Header>
        <Grid>
          <Grid.Row centered>
            <Grid.Column largeScreen={ 4 } computer={ 6 } tablet={ 8 } mobile={ 12 }>
              <Form onSubmit={ this.newTicket }>
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
                <Button type="submit" content="Save" basic color="black" floated="right" />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}