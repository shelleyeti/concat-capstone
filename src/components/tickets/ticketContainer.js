import React, { Component } from 'react';
import TicketList from './ticketList';
import CurrentTicket from './currentTicket';
import './tickets.css';

// class CurrentTicketHeader extends Component {
//   render() {
//     return <h1 className="current-ticket">Current Tickets</h1>;
//   }
// }


export default class TicketContainer extends Component {
  render() {
    return (
      <div className='ticket-list'>
        <TicketList { ...this.props } />
        {/* <CurrentTicketHeader /> */ }
        <CurrentTicket />
      </div>
    );
  }
}