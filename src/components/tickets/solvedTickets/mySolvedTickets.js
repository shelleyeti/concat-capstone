import React, { Component } from 'react';
import MySolvedTicketItem from './mySolvedTicketItem';
import '../../tickets/tickets.css';

class MySolvedTicketHeader extends Component {
  render() {
    return <h1>My Solved Tickets</h1>;
  }
}

export default class MySolvedTicketList extends Component {
  render() {
    let solvedTicket = this.props.reverseTickets.filter((ticket) => {
      //the logged in user is assigned to a ticket
      let currentUserIsTeacherWithTicket = false;
      //iterate over joined table
      this.props.allTeacherTickets.forEach((join) => {
        //both keys in joined table equal
        if (join.ticketId === ticket.id && join.userId === this.props.activeUser.id && ticket.classId === this.props.activeUser.classId)
          currentUserIsTeacherWithTicket = true;
      })

      if (ticket.ticketComplete && currentUserIsTeacherWithTicket)
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
        <MySolvedTicketItem
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
        <MySolvedTicketHeader />
        <span> { classTickets } </span>
      </div>
    );
  }
}