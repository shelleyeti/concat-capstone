import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import TicketForm from './tickets/ticketForm';
import TicketContainer from './tickets/ticketContainer';
import TicketsManager from '../modules/ticketManager';
import TeacherDash from './dashboard/teacherDashContainer'
import UsersManager from '../modules/userManager';
import CurrentTicketManager from '../modules/currentTicketUsers';
import SolvedTicketsContainer from './tickets/solvedTickets'
import Login from './dashboard/Login';
import Register from './dashboard/Register';
import Home from './dashboard/Home';
import { logout } from './auth/userManager';

class ApplicationViews extends Component {
  state = {
    users: [],
    tickets: [],
    reverseTickets: [],
    joinedTickets: [],
    classTickets: [],
    currentTicketUsers: [],
    classes: []
  };
  //calls

  addTicket = ticket => {
    const newState = {};
    return TicketsManager.saveTicket(ticket)
      .then(() => TicketsManager.getAllTickets())
      .then(ticket => newState.tickets = ticket)
      .then((tickets) => {
        this.props.history.push("/tickets/my-tickets")
        this.setState(newState)
        //return tickets so it can be used in the form
        return tickets;
      });
  };

  editTicket = editedTicket => {
    const newState = {};
    TicketsManager.editTicket(editedTicket)
      .then(() => TicketsManager.getAllTickets())
      .then(ticket => (newState.tickets = ticket))
      .then(() => {
        this.props.history.push("/tickets/my-tickets");
        this.setState(newState);
      });
  };

  // getAllTicketsReverseOrder = () => {
  //   const newState = {};
  //   TicketsManager.getAllTicketsReverse()
  //     .then(reverseOrder => (newState.reverseTickets = reverseOrder))
  //     .then(() => {
  //       this.props.history.push("/tickets/solved-tickets");
  //       this.setState(newState);
  //     });
  // }

  deleteUser = id => {
    const newState = {};
    UsersManager.deleteUser(id)
      .then(UsersManager.getAllUsers)
      .then(user => (newState.users = user))
      .then(() => {
        this.props.history.push("/dashboard/teacher");
        this.setState(newState);
      });
  };

  addUser = user => {
    const newState = {};
    return UsersManager.saveUser(user)
      .then(() => UsersManager.getAllUsers())
      .then(user => newState.users = user)
      .then((users) => {
        this.props.setUser(user);
        this.props.history.push("/dashboard/teacher")
        this.setState(newState)
        //return users so it can be used in the form
        return users;
      });
  };

  editUser = editedUser => {
    const newState = {};
    UsersManager.editUser(editedUser)
      .then(() => UsersManager.getAllUsers())
      .then(user => (newState.users = user))
      .then(() => {
        this.props.setUser(editedUser);
        this.props.history.push("/dashboard/teacher");
        this.setState(newState);
      });
  };

  deleteCurrentTicketUser = id => {
    const newState = {};
    CurrentTicketManager.deleteCurrentTicketUser(id)
      .then(CurrentTicketManager.getAllCurrentTicketUsers)
      .then(teacherTicket => (newState.currentTicketUsers = teacherTicket))
      .then(() => {
        this.props.history.push("/tickets/my-tickets");
        this.setState(newState);
      });
  };

  addCurrentTicketUser = teacherTicket => {
    const newState = {};
    return CurrentTicketManager.saveCurrentTicketUser(teacherTicket)
      .then(() => CurrentTicketManager.getAllCurrentTicketUsers())
      .then(teacherTicket => newState.currentTicketUsers = teacherTicket)
      .then((ticket) => {
        this.props.history.push("/tickets/my-tickets")
        this.setState(newState)
        //return ticket so it can be used in the form
        return ticket;
      });
  };

  editCurrentTicketUser = editedTicket => {
    const newState = {};
    CurrentTicketManager.editCurrentTicketUser(editedTicket)
      .then(() => CurrentTicketManager.getAllCurrentTicketUsers())
      .then(teacherTicket => (newState.currentTicketUser = teacherTicket))
      .then(() => {
        this.props.history.push("/tickets/my-tickets");
        this.setState(newState);
      });
  };

  // getAllJoinedTicketUser = () => {
  //   const newState = {};
  //   CurrentTicketManager.getAllCurrentTicketUsers()
  //     .then(joinedTeacher => (newState.currentTicketUsers = joinedTeacher))
  //     .then(() => {
  //       this.props.history.push("/tickets/my-tickets");
  //       this.setState(newState);
  //     });
  // }

  componentDidMount() {
    const newState = {};
    TicketsManager.getAllTickets()
      .then(tickets => { newState.tickets = tickets })
      .then(UsersManager.getAllUsers)
      .then(users => { newState.users = users })
      .then(CurrentTicketManager.getAllCurrentTicketUsers)
      .then(ticket => { newState.currentTicketUsers = ticket })
      .then(TicketsManager.getAllTicketsReverse)
      .then(reverseTicket => { newState.reverseTickets = reverseTicket })
      // .then(Users.getAllUsers)
      // .then(users => { newState.users = users })
      // .then(Messages.getAllMessages)
      // .then(messages => { newState.messages = messages })
      .then(() => this.setState(newState));
  }

  // isAuthenticated = () => sessionStorage.getItem("user") !== null;

  render() {
    return (
      <>
        <div className="App">
          <div>
            <Route exact path="/" render={ (props) => {
              return this.props.activeUser ? (
                <Home
                  { ...props }
                  { ...this.props }
                  activeUser={ this.props.activeUser }
                  onLogout={ logout }
                />
              ) : (
                  <Redirect to="/login" />
                )
            } } />
            <Route path="/login" render={ (props) =>
              <Login { ...props }
                onLogin={ (user) => this.setState({ user: user }) } /> }
            />
            <Route path="/register" render={ (props) =>
              <Register { ...props }
                onRegister={ (user) => this.props.setUser(user) } /> }
            />
            <Route exact path="/tickets/my-tickets" render={ (props) => {
              // if (this.isAuthenticated()) {
              return <TicketContainer
                { ...props }
                { ...this.props }
                allUsers={ this.state.users }
                allTickets={ this.state.tickets }
                addTicket={ this.addTicket }
                editTicket={ this.editTicket }
                allTeacherTickets={ this.state.currentTicketUsers }
                removeTeacherTicket={ this.deleteCurrentTicketUser }
                addTeacherTicket={ this.addCurrentTicketUser }
                editTeacherTicket={ this.editCurrentTicketUser }
              />
              // } else {
              //   return <Redirect to="/" />
              // }
            } }
            />
            <Route exact path="/tickets/solved-tickets" render={ (props) => {
              // if (this.isAuthenticated()) {
              return <SolvedTicketsContainer
                { ...props }
                { ...this.props }
                allUsers={ this.state.users }
                // allTickets={ this.state.tickets }
                reverseTickets={ this.state.reverseTickets }
                addTicket={ this.addTicket }
                editTicket={ this.editTicket }
                allTeacherTickets={ this.state.currentTicketUsers }
                removeTeacherTicket={ this.deleteCurrentTicketUser }
                addTeacherTicket={ this.addCurrentTicketUser }
                editTeacherTicket={ this.editCurrentTicketUser }
              />
              // } else {
              //   return <Redirect to="/" />
              // }
            } }
            />
            <Route exact path="/tickets/new" render={ (props) => {
              // if (this.isAuthenticated()) {
              return <TicketForm
                { ...props }
                { ...this.props }
                ticket={ this.state.tickets }
                editTicket={ this.editTicket }
              />
              // } else {
              //   return <Redirect to="/" />
              // }
            } }
            />
            <Route exact path="/dashboard/teacher" render={ (props) => {
              // if (this.isAuthenticated()) {
              return <TeacherDash
                { ...props }
                { ...this.props }
                user={ this.state.users }
                editUser={ this.editUser }
              />
              // } else {
              //   return <Redirect to="/" />
              // }
            } }
            />
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(ApplicationViews);
