import React, { Component } from 'react';
import TicketList from './ticketList';
import CurrentTicket from './currentTicket';
import NewTicket from '../ticketForm'
import '../../tickets/tickets.css';

export default class TicketContainer extends Component {

  handleView = () => {
    //teacher view
    if (this.props.activeUser !== null && this.props.activeUser.student === false) {
      return (
        <div className='ticket-list'>
          <TicketList { ...this.props } />
          <CurrentTicket { ...this.props } />
        </div>
      )
      //student view
    } else if (this.props.activeUser !== null && this.props.activeUser.student) {
      return (
        <div className='ticket-list'>
          <TicketList { ...this.props } />
          <NewTicket { ...this.props } />
        </div>
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