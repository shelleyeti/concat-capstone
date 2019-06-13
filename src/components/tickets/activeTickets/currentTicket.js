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
    });

    let currentTickets = openTicket.map((item, index) => {
      let image = ""
      this.props.allUsers.forEach((user) => {
        if (item.userId === user.id) {
          image = user.image
        }
      })
      return (
        <CurrentTicketItem
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

      <div className="current-ticket-container">
        <CurrentTicketHeader />
        <span> { currentTickets } </span>
      </div>
    )
  }
}