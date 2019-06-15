import React, { Component } from 'react';
import MySolvedTicketList from './mySolvedTickets';
import AllSolvedTicketList from './allSolvedTickets';
import '../../tickets/tickets.css';

export default class SolvedTicketsContainer extends Component {

  handleView = () => {
    //teacher view
    if (this.props.activeUser !== null && this.props.activeUser.student === false) {
      return (
        <div className='ticket-list'>
          <MySolvedTicketList { ...this.props } />
          <AllSolvedTicketList { ...this.props } />
        </div>
      )
      //student view
    } else if (this.props.activeUser !== null && this.props.activeUser.student) {
      return (
        <h1>sup more</h1>
      )
    }
  }

  render() {
    return (
      <>
        { this.handleView() }
      </>
    );
  }
}