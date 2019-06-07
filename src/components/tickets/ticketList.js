import React, { Component } from 'react';
import Tickets from '../../modules/ticketManager';
import { Card, Container, Grid, Image, Button } from 'semantic-ui-react';

export default class TicketList extends Component {

  state = {
    tickets: []
  }

  componentDidMount() {
    Tickets.getAllTickets().then(tickets => {
      this.setState({ tickets: tickets });
    });
  }

  render() {
    return (
      <Container className="profile-list--container">
        <Grid>
          <Grid.Row>
            {
              this.state.tickets.map(ticket => {
                return (
                  <Grid.Column key={ ticket.id } largeScreen={ 4 } computer={ 4 } tablet={ 8 } mobile={ 16 }>
                    <Card>
                      <Image floated='left' size='mini' src={ ticket.userId } />
                      {/* <Image src={ ticket.photo } wrapped ui={ false } /> */ }
                      <Card.Content>
                        <Card.Header>{ ticket.ticketTitle }</Card.Header>
                        <Card.Description>{ ticket.ticketBody }</Card.Description>
                        <Button>Complete</Button>
                        <Card.Meta>{ ticket.submitTime } </Card.Meta>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                )
              })
            }
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}