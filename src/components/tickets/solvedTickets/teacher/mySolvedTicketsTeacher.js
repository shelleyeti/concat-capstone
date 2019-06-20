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
      //the logged in user is assigned to a ticket
      let currentUserIsTeacherWithTicket = false;
      //iterate over joined table
      this.props.allTeacherTickets.forEach((join) => {
        //both keys in joined table equal
        if (join.ticketId === ticket.id && join.userId === this.props.activeUser.id)
          currentUserIsTeacherWithTicket = true;
      })

      if (ticket.ticketComplete && currentUserIsTeacherWithTicket)
        return ticket;
      //resolves react warning regarding return after arrow function
      return null;
    });

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
        <MySolvedTicketItem
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
        <MySolvedTicketHeader />
        <span> { classTickets } </span>
      </div>
    );
  }
}