import React, { Component } from 'react';
import CurrentTicketItem from './currentTicketItem'

class CurrentTicketHeader extends Component {

  render() {
    return <h1>Current Ticket</h1>;
  }
}

export default class TicketForm extends Component {

  render() {
    let teacherTicketJoinId = 0;
    let openTicket = this.props.allTickets.filter((ticket) => {
      let currentUserIsTeacherWithTicket = false;
      this.props.allTeacherTickets.forEach((join) => {
        if (join.ticketId === ticket.id && join.userId === this.props.activeUser.id) {
          currentUserIsTeacherWithTicket = true;
          teacherTicketJoinId = join.id;
        }
      })
      if (ticket.ticketComplete === false && currentUserIsTeacherWithTicket) {
        ticket.teacherTicketJoinId = teacherTicketJoinId
        return ticket;
      }
      //resolves react warning regarding return after arrow function
      return null;
    });

    let currentTickets = openTicket.map((item, index) => {
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
        <CurrentTicketItem
          { ...this.props }
          key={ index }
          item={ item }
          index={ index }
          image={ images }
          editTicketState={ this.editTicketState }
          handleOpenModal={ this.handleOpenCloseModal }
          hasMultipleJoins={ hasMultipleJoins }
        />
      );
    });


    return (
      <div className="current-ticket-container">
        <CurrentTicketHeader />
        <span> { currentTickets } </span>
      </div>
    )
  }
}