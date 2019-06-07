import React, { Component } from 'react';
import TicketList from './ticketList';
import CurrentTicket from './currentTicket';
import './tickets.css';

export default class TicketContainer extends Component {
  render() {
    return (
      <div className='ticket-list'>
        <TicketList { ...this.props } />
        <CurrentTicket { ...this.props } />
      </div>
    );
  }
}