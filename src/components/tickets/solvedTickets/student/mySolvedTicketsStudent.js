import React, { Component } from 'react';
import MySolvedTicketItem from './mySolvedTicketItem';
import '../../../tickets/tickets.css';

class MySolvedTicketHeader extends Component {
  render() {
    return <h1>My Solved Tickets</h1>;
  }
}

export default class MySolvedTicketList extends Component {
  render() {
    let solvedTicket = this.props.reverseTickets.filter((ticket) => {
      if (ticket.ticketComplete && ticket.userId === this.props.activeUser.id)
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