import React, { Component } from 'react';
import TicketListItem from './ticketListItem';
import './tickets.css';

class OpenTicketHeader extends Component {
  render() {
    return <h1>Open Tickets</h1>;
  }
}

export default class TicketList extends Component {
  render() {
    let openTicket = this.props.ticket.filter((ticket) => {
      if (ticket.ticketComplete === false)
        return ticket;
    });

    let classTickets = openTicket.map((item, index) => {

      return (
        <TicketListItem
          key={ index }
          item={ item }
          index={ index }
          editTicket={ this.props.editTicket } />
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