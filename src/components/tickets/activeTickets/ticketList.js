import React, { Component } from 'react';
import TicketItem from './ticketItem';
import EditTicket from './editTicketModal';
import NotifyModal from './notifyTicketModal'
import '../../tickets/tickets.css';


class OpenTicketHeader extends Component {
  render() {
    return <h1>Open Tickets</h1>;
  }
}

export default class TicketList extends Component {
  state = {
    openModal: false,
    openNotify: false,
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

  handleNotifyModal = (open) => {
    if (open && localStorage.notifyModalOpenAlready === "true")
      return;

    if (open) {
      localStorage.setItem("notifyModalOpenAlready", true);
    }

    this.setState({
      openNotify: open
    });
  }

  componentWillMount() {
    localStorage.setItem("notifyModalOpenAlready", false);
  }

  render() {
    let teacherHadYourTicket = false;
    let numOfTeachHadTicket = 0;

    let openTicket = this.props.allTickets.filter((ticket) => {
      //the logged in user is assigned to a ticket
      let currentUserIsTeacherWithTicket = false;
      let isTicketAssignedToSomeone = false;
      let teacherHadTicket = false;
      //iterate over joined table
      this.props.allTeacherTickets.forEach((join) => {
        //both keys in joined table equal

        if (join.ticketId === ticket.id && join.userId === this.props.activeUser.id && ticket.classId === this.props.activeUser.classId) {
          teacherHadTicket = true;
          currentUserIsTeacherWithTicket = true;
        }
        else if (join.ticketId === ticket.id) {
          teacherHadTicket = true;
          isTicketAssignedToSomeone = true;
        }
      })

      if (ticket.ticketComplete === false && teacherHadTicket && ticket.userId === this.props.activeUser.id) {
        teacherHadYourTicket = true;
        numOfTeachHadTicket++;
      }

      if (ticket.ticketComplete === false && (!currentUserIsTeacherWithTicket && isTicketAssignedToSomeone === false)) {
        return ticket;
      }
      //resolves react warning regarding return after arrow function
      return null;
    });

    if (teacherHadYourTicket && this.state.openNotify === false) {
      setTimeout(() => {
        this.handleNotifyModal(true);
        console.log(numOfTeachHadTicket);
      }, 0)
    }

    let classTickets = openTicket.map((item, index) => {
      let hasMultipleJoins = false;
      let images = [];
      let joinedTicketId = 0
      let showRemoveJoin = false;

      //keeps the creator of the ticket first in image render
      this.props.allUsers.forEach((user) => {
        if (item.userId === user.id) {
          images.push(user.image);
        }
      });

      this.props.allUsers.forEach((user) => {
        this.props.joinedTickets.forEach((join) => {
          if (item.id === join.ticketId && join.userId === user.id) {
            images.push(user.image);
          }

          if (item.id === join.ticketId && join.userId === this.props.activeUser.id) {
            showRemoveJoin = true;
            joinedTicketId = join.id
          }
        });
      })

      if (images.length > 1)
        hasMultipleJoins = true;

      return (
        <TicketItem
          { ...this.props }
          key={ index }
          item={ item }
          index={ index }
          image={ images }
          editTicketState={ this.editTicketState }
          handleOpenModal={ this.handleOpenCloseModal }
          handleNotifyModal={ this.handleNotifyModal }
          hasMultipleJoins={ hasMultipleJoins }
          showRemoveJoin={ showRemoveJoin }
          joinedTicketId={ joinedTicketId }
        />
      );
    });

    return (
      <div className="new-ticket-container">
        <OpenTicketHeader />
        <span> { classTickets } </span>
        <EditTicket
          { ...this.props }
          editTicketItem={ this.state.editTicketItem }
          handleOpenCloseModal={ this.handleOpenCloseModal }
          openModal={ this.state.openModal }
        />
        <NotifyModal
          { ...this.props }
          editTicketItem={ this.state.editTicketItem }
          handleNotifyModal={ this.handleNotifyModal }
          openNotify={ this.state.openNotify }
        />
      </div>
    );
  }
}