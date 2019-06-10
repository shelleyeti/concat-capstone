import React, { Component } from 'react';
import SolvedTicketList from './ticketList';
import CurrentTicket from './currentTicket';
import './tickets.css';

export default class SolvedTicketContainer extends Component {
  render() {
    return (
      <div className='ticket-list'>
        <SolvedTicketList { ...this.props } />
        {/* <CurrentTicket { ...this.props } /> */ }
      </div>
    );
  }
}