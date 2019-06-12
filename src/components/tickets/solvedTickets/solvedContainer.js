import React, { Component } from 'react';
import MySolvedTicketList from './mySolvedTickets';
// import MySolvedTicketList from './solvedTicketsClass';
import '../../tickets/tickets.css';

export default class SolvedTicketsContainer extends Component {
  render() {
    return (
      <div className='ticket-list'>
        <MySolvedTicketList { ...this.props } />
        {/* <MySolvedTicketList { ...this.props } /> */ }
      </div>
    );
  }
}