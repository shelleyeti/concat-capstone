import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Form, Grid, Button, Message } from 'semantic-ui-react';
import moment from 'moment';
import '../tickets/tickets.css';

const displayStyle = {
  display: "none"
}

const FormSuccess = () => (
  <Form style={ displayStyle } className="ticketFormSuccess" success >
    <Message success header='Form Completed' content="Your ticket is now in queue" />
  </Form >
)

class FormHeader extends Component {
  render() {
    return <h1>Submit a New Ticket</h1>;
  }
}

class TicketForm extends Component {

  newTicket = () => {
    this.props.addTicket({
      userId: this.props.activeUser.id,
      classId: this.props.activeUser.classId,
      ticketComplete: false,
      ticketTitle: this.state.ticketTitle,
      ticketBody: this.state.ticketBody,
      submitTime: moment(new Date()).format('MMMM Do YYYY, h:mm:ss a'),
      open: true,
      linked: false,
      solutionNotes: null
    })
      .then(() => {
        setTimeout(() => {
          document.querySelector(".ticketFormSuccess").style.display = "block";
          document.querySelector(".form-fields").reset();
          setTimeout(() => {
            document.querySelector(".ticketFormSuccess").style.display = "none";
          }, 1000)
        }, 200)
      })
  }

  render() {
    return (
      <>
        <div className="new-ticket-container">
          <FormHeader />
          <Grid>
            <Grid.Row centered>
              <Grid.Column>
                <Form className="form-fields fluid" onSubmit={ this.newTicket }>
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
                  <Button className="trolley" type="submit" content="Save" floated="right" />
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <FormSuccess />
        </div>
      </>
    )
  }
}

export default withRouter(TicketForm)