import React, { Component } from 'react';
import TicketItem from './ticketItem';
import EditTicket from './editTicketModal';
import '../../tickets/tickets.css';
import joinedTickets from '../../../modules/joinedTickets';


class OpenTicketHeader extends Component {
  render() {
    return <h1>Open Tickets</h1>;
  }
}

export default class TicketList extends Component {
  state = {
    openModal: false,
    editTicketItem: {}
  };

  editTicketState = (editItem) => {
    this.setState({
      editTicketItem: editItem
    })
  }

  handleOpenCloseModal = (open) => {
    this.setState({
      openModal: open
    });
  }

  render() {
    let openTicket = this.props.allTickets.filter((ticket) => {
      //the logged in user is assigned to a ticket
      let currentUserIsTeacherWithTicket = false;
      let isTicketAssignedToSomeone = false;
      //iterate over joined table
      this.props.allTeacherTickets.forEach((join) => {
        //both keys in joined table equal
        if (join.ticketId === ticket.id && join.userId === this.props.activeUser.id && ticket.classId === this.props.activeUser.classId)
          currentUserIsTeacherWithTicket = true;
        else if (join.ticketId === ticket.id) {
          isTicketAssignedToSomeone = true;
        }
      })

      if (ticket.ticketComplete === false && (!currentUserIsTeacherWithTicket && isTicketAssignedToSomeone === false))
        return ticket;
      //resolves react warning regarding return after arrow function
      return null;
    });

    let classTickets = openTicket.map((item, index) => {
      let images = [];
      this.props.allUsers.forEach((user) => {
        if (item.userId === user.id) {
          images.push(user.image);
        }

        this.props.joinedTickets.forEach((join) => {
          if (item.id === join.ticketId && join.userId === user.id) {
            images.push(user.image);
          }
        });
      })



      return (
        <TicketItem
          { ...this.props }
          key={ index }
          item={ item }
          index={ index }
          image={ images }
          editTicketState={ this.editTicketState }
          handleOpenModal={ this.handleOpenCloseModal }
        />
      );
    });

    return (
      <div className="new-ticket-container">
        <OpenTicketHeader />
        <span> { classTickets } </span>
        <EditTicket { ...this.props }
          editTicketItem={ this.state.editTicketItem }
          handleOpenCloseModal={ this.handleOpenCloseModal }
          openModal={ this.state.openModal } />
      </div>
    );
  }
}