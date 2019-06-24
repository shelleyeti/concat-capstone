import React, { Component } from 'react';
import AllSolvedTicketItem from './allSolvedTicketsItem';
import '../../../tickets/tickets.css';

class AllSolvedTicketHeader extends Component {
  render() {
    return <h1>All Solved Tickets</h1>;
  }
}

export default class AllSolvedTicketList extends Component {
  render() {
    let solvedTicket = this.props.reverseTickets.filter((ticket) => {
      if (ticket.ticketComplete && ticket.classId === this.props.activeUser.classId && ticket.userId !== this.props.activeUser.id)
        return ticket;
      //resolves react warning regarding return after arrow function
      return null;
    })

    let classTickets = solvedTicket.map((item, index) => {
      let hasMultipleJoins = false;
      let images = [];

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
        });
      })

      if (images.length > 1)
        hasMultipleJoins = true;

      return (
        <AllSolvedTicketItem
          { ...this.props }
          key={ index }
          item={ item }
          index={ index }
          image={ images }
          hasMultipleJoins={ hasMultipleJoins }
        />
      );
    });
    return (
      <div className="new-ticket-container">
        <AllSolvedTicketHeader />
        <span> { classTickets } </span>
      </div>
    );
  }
}
