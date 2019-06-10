import React, { Component } from 'react';
import SolvedTicketListItem from './solvedTicketListItem';
import './tickets.css';

class SolvedTicketHeader extends Component {
  render() {
    return <h1>My Solved Tickets</h1>;
  }
}

export default class SolvedTicketList extends Component {
  render() {
    let solvedTicket = this.props.reverseTickets.filter((ticket) => {
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

      if (ticket.ticketComplete === true && (!currentUserIsTeacherWithTicket && isTicketAssignedToSomeone === true))
        return ticket;
    });

    let classTickets = solvedTicket.map((item, index) => {
      let image = ""
      this.props.allUsers.forEach((user) => {
        if (item.userId === user.id) {
          image = user.image
        }
      })
      return (
        <SolvedTicketListItem
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
        <SolvedTicketHeader />
        <span> { classTickets } </span>
      </div>
    );
  }
}