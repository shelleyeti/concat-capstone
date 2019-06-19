import React, { Component } from 'react';
import { Grid, Message, Container, Header } from 'semantic-ui-react';

export default class Home extends Component {

  logout = () => {
    this.props.onLogout();
    this.props.history.push('/login');
  }

  solvedTickets = () => {
    let numberOfTickets = 0;
    if (this.props.activeUser.student) {
      numberOfTickets = this.props.ticket.filter((ticket) => {
        if (ticket.userId === this.props.activeUser.id && ticket.ticketComplete && ticket.classId === this.props.activeUser.classId)
          return ticket
        return null
      })
    } else if (this.props.activeUser.student === false) {
      numberOfTickets = this.props.ticket.filter((ticket) => {
        let currentUserIsTeacherWithTicket = false;
        //iterate over joined table
        this.props.allTeacherTickets.forEach((join) => {
          //both keys in joined table equal
          if (join.ticketId === ticket.id && join.userId === this.props.activeUser.id)
            currentUserIsTeacherWithTicket = true;
        })

        if (ticket.classId === this.props.activeUser.classId && ticket.ticketComplete && currentUserIsTeacherWithTicket)
          return ticket
        return null
      })
    }
    return numberOfTickets;
  }


  render() {

    return (
      <Container className="home--container">
        <Grid>
          <Grid.Row centered>
            <Grid.Column largeScreen={ 8 } computer={ 10 } tablet={ 12 } mobile={ 16 }>
              <Header textAlign="center">Welcome { this.props.activeUser.name }</Header>
              <Message
                header="You have solved"
                content={ this.solvedTickets().length + " tickets" }
              />
            </Grid.Column>
          </Grid.Row>
        </Grid >
      </Container>
    )
  }
}