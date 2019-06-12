import React, { Component } from 'react';
import AllClassesListItem from './allClassesListItem';

class AllClasses extends Component {
  render() {
    return <h1>All Classes</h1>;
  }
}

export default class ClassList extends Component {
  render() {
    let openTicket = this.props.allTickets.filter((ticket) => {
      //the logged in user is assigned to a ticket
      let currentUserIsTeacherWithTicket = false;
      let isTicketAssignedToSomeone = false;
      //iterate over joined table
      this.props.allTeacherTickets.forEach((join) => {
        //both keys in joined table equal
        if (join.ticketId === ticket.id && join.userId === this.props.activeUser.id)
          currentUserIsTeacherWithTicket = true;
        else if (join.ticketId === ticket.id) {
          isTicketAssignedToSomeone = true;
        }
      })

      if (ticket.ticketComplete === false && (!currentUserIsTeacherWithTicket && isTicketAssignedToSomeone === false))
        return ticket;
    });

    let classTickets = openTicket.map((item, index) => {
      let image = ""
      this.props.allUsers.forEach((user) => {
        if (item.userId === user.id) {
          image = user.image
        }
      })
      return (
        <AllClassesListItem
          { ...this.props }
          key={ index }
          item={ item }
          index={ index }
          image={ image }
        // editTicket={ this.props.editTicket } 
        />
      );
    });
    return (
      <div className="new-ticket-container">
        <AllClasses />
        <span> { classTickets } </span>
      </div>
    );
  }
}