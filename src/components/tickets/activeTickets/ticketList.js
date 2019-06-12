import React, { Component } from 'react';
import TicketItem from './ticketItem';
import '../../tickets/tickets.css';

class OpenTicketHeader extends Component {
  render() {
    return <h1>Open Tickets</h1>;
  }
}

export default class TicketList extends Component {
  render() {
    let openTicket = this.props.allTickets.filter((ticket) => {
      //the logged in user is assigned to a ticket
      let currentUserIsTeacherWithTicket = false;
      let isTicketAssignedToSomeone = false;
      //iterate over joined table
      this.props.allTeacherTickets.forEach((join) => {
        //both keys in joined table equal
        if (join.ticketId === ticket.id && join.userId === this.props.activeUser.id)
          currentUserIsTeacherWithTicket = true;
        else if (join.ticketId === ticket.id) {
          isTicketAssignedToSomeone = true;
        }
      })

      if (ticket.ticketComplete === false && (!currentUserIsTeacherWithTicket && isTicketAssignedToSomeone === false))
        return ticket;
    });

    let classTickets = openTicket.map((item, index) => {
      let image = ""
      this.props.allUsers.forEach((user) => {
        if (item.userId === user.id) {
          image = user.image
        }
      })
      return (
        <TicketItem
          { ...this.props }
          key={ index }
          item={ item }
          index={ index }
          image={ image }
        // editTicket={ this.props.editTicket } 
        />
      );
    });
    return (
      <div className="new-ticket-container">
        <OpenTicketHeader />
        <span> { classTickets } </span>
      </div>
    );
  }
}