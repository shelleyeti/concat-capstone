import React, { Component } from 'react';
import MySolvedTicketList from './mySolvedTickets';
import AllSolvedTicketList from './allSolvedTickets';
import '../../tickets/tickets.css';

export default class SolvedTicketsContainer extends Component {
  render() {
    return (
      <div className='ticket-list '>
        <MySolvedTicketList { ...this.props } />
        <AllSolvedTicketList { ...this.props } />
      </div>
    );
  }
}