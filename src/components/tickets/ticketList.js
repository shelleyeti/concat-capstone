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
    let classTickets = this.props.ticket.map((item, index) => {

      return (
        <TicketListItem
          key={ index }
          item={ item }
          index={ index }
          editTask={ this.props.editTask }
          removeItem={ this.props.removeItem }
          markTodoDone={ this.props.markTodoDone } />
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