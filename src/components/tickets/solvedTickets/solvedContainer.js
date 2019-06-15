import React, { Component } from 'react';
import MySolvedTicketListTeacher from './teacher/mySolvedTicketsTeacher';
import AllSolvedTicketListTeacher from './teacher/allSolvedTicketsTeacher';
import MySolvedTicketListStudent from './student/mySolvedTicketsStudent'
import AllSolvedTicketListStudent from './student/allSolvedTicketsStudent';
import '../../tickets/tickets.css';

export default class SolvedTicketsContainer extends Component {

  handleView = () => {
    //teacher view
    if (this.props.activeUser !== null && this.props.activeUser.student === false) {
      return (
        <div className='ticket-list'>
          <MySolvedTicketListTeacher { ...this.props } />
          <AllSolvedTicketListTeacher { ...this.props } />
        </div>
      )
      //student view
    } else if (this.props.activeUser !== null && this.props.activeUser.student) {
      return (
        <div className='ticket-list'>
          <MySolvedTicketListStudent { ...this.props } />
          <AllSolvedTicketListStudent { ...this.props } />
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