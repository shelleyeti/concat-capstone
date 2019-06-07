import React, { Component } from 'react';
import CurrentTicketItem from './currentTicketItem'
import { nullLiteral } from '@babel/types';

class CurrentTicketHeader extends Component {
  render() {
    return <h1>Current Ticket</h1>;
  }
}

export default class TicketForm extends Component {

  render() {
    let openTicket = this.props.ticket.filter((ticket) => {
      if (ticket.ticketComplete === false && ticket.userId === 10)
        return ticket;
    });

    let currentTickets = openTicket.map((item, index) => {
      return (
        <CurrentTicketItem
          key={ index }
          item={ item }
          index={ index }
          editTicket={ this.props.editTicket } />
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