import React, { Component } from 'react';
import AllSolvedTicketItem from './allSolvedTicketsItem';
import '../../tickets/tickets.css';

class MySolvedTicketHeader extends Component {
  render() {
    return <h1>All Solved Tickets</h1>;
  }
}

export default class AllSolvedTicketList extends Component {
  render() {
    let solvedTicket = this.props.reverseTickets.filter((ticket) => {
      if (ticket.ticketComplete && ticket.classId === this.props.activeUser.classId && ticket.userId !== this.props.activeUser.id)
        return ticket
    })

    let classTickets = solvedTicket.map((item, index) => {
      let image = ""
      this.props.allUsers.forEach((user) => {
        if (item.userId === user.id) {
          image = user.image
        }
      })
      return (
        <AllSolvedTicketItem
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