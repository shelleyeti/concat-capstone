import React, { Component } from 'react';
import { Grid, Message, Container, Header } from 'semantic-ui-react';

export default class Home extends Component {

  logout = () => {
    this.props.onLogout();
    this.props.history.push('/login');
  }

  render() {
    let numberOfTickets = this.props.ticket.filter((ticket) => {
      if (ticket.userId === this.props.activeUser.id && ticket.ticketComplete)
        return ticket
    })

    return (
      <Container className="home--container">
        <Grid>
          <Grid.Row centered>
            <Grid.Column largeScreen={ 8 } computer={ 10 } tablet={ 12 } mobile={ 16 }>
              <Header textAlign="center">Welcome { this.props.activeUser.name }</Header>
              <Message
                header="You have solved"
                content={ numberOfTickets.length + " tickets" }
              />
            </Grid.Column>
          </Grid.Row>
        </Grid >
      </Container>
    )
  }
}