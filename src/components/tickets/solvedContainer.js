import React, { Component } from 'react';
import AllSolvedTicketList from './solvedTickets';
// import MySolvedTicketList from './solvedTicketsClass';
import './tickets.css';

export default class SolvedTicketsContainer extends Component {
  render() {
    return (
      <div className='ticket-list'>
        <AllSolvedTicketList { ...this.props } />
        {/* <MySolvedTicketList { ...this.props } /> */ }
      </div>
    );
  }
}