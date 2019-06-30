import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import TicketItem from '../tickets/activeTickets/ticketItem';

export default class SearchResults extends Component {
  render() {
    let teacherHadYourTicket = false;
    let numOfTeachHadTicket = 0;
    let ticketNotify = {};

    let openTicket = this.props.searchResults.filter((ticket) => {
      //the logged in user is assigned to a ticket
      let currentUserIsTeacherWithTicket = false;
      let isTicketAssignedToSomeone = false;
      let teacherHadTicket = false;

      //iterate over joined table
      this.props.allTeacherTickets.forEach((join) => {
        //both keys in joined table equal

        if (join.ticketId === ticket.id && join.userId === this.props.activeUser.id && ticket.classId === this.props.activeUser.classId) {
          teacherHadTicket = true;
          currentUserIsTeacherWithTicket = true;
        }
        else if (join.ticketId === ticket.id) {
          teacherHadTicket = true;
          isTicketAssignedToSomeone = true;
        }
      })

      if (ticket.ticketComplete === false && teacherHadTicket && ticket.userId === this.props.activeUser.id) {
        teacherHadYourTicket = true;
        numOfTeachHadTicket++;
        ticketNotify = ticket;
      }

      //if (ticket.ticketComplete === false && (!currentUserIsTeacherWithTicket && isTicketAssignedToSomeone //=== false)) {
      return ticket;
      // }
      //resolves react warning regarding return after arrow function
      // return null;
    });

    /*if (teacherHadYourTicket && this.state.openNotify === false) {
      setTimeout(() => {
        this.handleNotifyModal(true, ticketNotify);
        console.log(numOfTeachHadTicket);
      }, 0)
    }*/

    let classTickets = openTicket.map((item, index) => {
      let hasMultipleJoins = false;
      let images = [];
      let joinedTicketId = 0
      let showRemoveJoin = false;

      //keeps the creator of the ticket first in image render
      this.props.allUsers.forEach((user) => {
        if (item.userId === user.id) {
          images.push(user.image);
        }
      });

      this.props.allUsers.forEach((user) => {
        this.props.joinedTickets.forEach((join) => {
          if (item.id === join.ticketId && join.userId === user.id) {
            images.push(user.image);
          }

          if (item.id === join.ticketId && join.userId === this.props.activeUser.id) {
            showRemoveJoin = true;
            joinedTicketId = join.id
          }
        });
      })

      if (images.length > 1)
        hasMultipleJoins = true;

      return (
        <TicketItem
          { ...this.props }
          key={ index }
          item={ item }
          index={ index }
          image={ images }
          //editTicketState={ this.editTicketState }
          //handleOpenModal={ this.handleOpenCloseModal }
          //handleNotifyModal={ this.handleNotifyModal }
          hasMultipleJoins={ hasMultipleJoins }
          showRemoveJoin={ showRemoveJoin }
          joinedTicketId={ joinedTicketId }
        />
      );
    });

    return (
      <Container className="searchResults">
        <h1>Search Results</h1>
        <span> { classTickets } </span>
      </Container>
    );
  }
}