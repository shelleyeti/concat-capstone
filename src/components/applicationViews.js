import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import TicketContainer from './tickets/activeTickets/ticketContainer';
import TicketsManager from '../modules/ticketManager';
import DashContainer from './dashboard/dashContainer'
import UsersManager from '../modules/userManager';
import CurrentTicketManager from '../modules/currentTicketUsers';
import SolvedTicketsContainer from './tickets/solvedTickets/solvedContainer';
import JoinedTicketManager from '../modules/joinedTickets';
import StepRegisterContainer from './registration/stepRegisterContainer';
import Login from './dashboard/Login';
import Home from './dashboard/Home';

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

  deleteUser = id => {
    const newState = {};
    UsersManager.deleteUser(id)
      .then(UsersManager.getAllUsers)
      .then(user => (newState.users = user))
      .then(() => {
        this.props.history.push("/dashboard");
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
        this.props.history.push("/dashboard")
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
        this.props.history.push("/dashboard");
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
        return id
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

  deleteJoin = id => {
    const newState = {};
    JoinedTicketManager.deleteJoinedTicket(id)
      .then(JoinedTicketManager.getAllJoinedTickets)
      .then(joinedTicket => (newState.joinedTickets = joinedTicket))
      .then(() => {
        this.props.history.push("/tickets/my-tickets");
        this.setState(newState);
      });
  };

  addJoin = newJoin => {
    const newState = {};
    return JoinedTicketManager.saveJoinedTicket(newJoin)
      .then(() => JoinedTicketManager.getAllJoinedTickets())
      .then(joinedTicket => newState.joinedTickets = joinedTicket)
      .then((joinedTicket) => {
        this.props.history.push("/tickets/my-tickets")
        this.setState(newState)
        return joinedTicket;
      });
  };

  editJoin = editJoinedTicket => {
    const newState = {};
    JoinedTicketManager.editJoinedTicket(editJoinedTicket)
      .then(() => JoinedTicketManager.getAllJoinedTickets())
      .then(joinedTicket => (newState.joinedTickets = joinedTicket))
      .then(() => {
        this.props.history.push("/tickets/my-tickets");
        this.setState(newState);
      });
  };


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
      .then(JoinedTicketManager.getAllJoinedTickets)
      .then(joinedTickets => { newState.joinedTickets = joinedTickets })
      .then(() => this.setState(newState));
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      const newState = {};
      TicketsManager.getAllTickets()
        .then(tickets => { newState.tickets = tickets })
        .then(UsersManager.getAllUsers)
        .then(users => { newState.users = users })
        .then(CurrentTicketManager.getAllCurrentTicketUsers)
        .then(ticket => { newState.currentTicketUsers = ticket })
        .then(TicketsManager.getAllTicketsReverse)
        .then(reverseTicket => { newState.reverseTickets = reverseTicket })
        .then(JoinedTicketManager.getAllJoinedTickets)
        .then(joinedTickets => { newState.joinedTickets = joinedTickets })
        .then(() => this.setState(newState));
    }
  }

  render() {
    return (
      <>
        <div className="App">
          <div>
            <Route exact path="/" render={ (props) => {
              if (this.props.activeUser) {
                return <Home
                  { ...props }
                  { ...this.props }
                  activeUser={ this.props.activeUser }
                  allUsers={ this.state.users }
                  ticket={ this.state.tickets }
                />
              } else {
                return <Redirect to="/login" />
              }
            } } />

            <Route exact path="/login" render={ (props) =>
              <Login { ...props }
                onLogin={ (user) => this.props.setUser(user) } /> }
            />

            <Route exact path="/register" render={ (props) => {
              return <StepRegisterContainer
                { ...props }
                { ...this.props }
                allUsers={ this.state.users }
                allClasses={ this.state.classes }
                addClass={ this.addClass }
                editClass={ this.editClass }
                onRegister={ (user) => this.props.setUser(user) }
              />
            } }
            />

            <Route exact path="/dashboard" render={ (props) => {
              if (this.props.activeUser) {
                return <DashContainer
                  { ...props }
                  { ...this.props }
                  user={ this.state.users }
                  editUser={ this.editUser }
                />
              } else {
                return <Redirect to="/login" />
              }
            } }
            />

            <Route exact path="/tickets/my-tickets" render={ (props) => {
              if (this.props.activeUser) {
                return <TicketContainer
                  { ...props }
                  { ...this.props }
                  allUsers={ this.state.users }
                  allTickets={ this.state.tickets }
                  joinedTickets={ this.state.joinedTickets }
                  addTicket={ this.addTicket }
                  editTicket={ this.editTicket }
                  addJoin={ this.addJoin }
                  editJoin={ this.editJoin }
                  deleteJoin={ this.deleteJoin }
                  allTeacherTickets={ this.state.currentTicketUsers }
                  removeTeacherTicket={ this.deleteCurrentTicketUser }
                  addTeacherTicket={ this.addCurrentTicketUser }
                  editTeacherTicket={ this.editCurrentTicketUser }
                />
              } else {
                return <Redirect to="/login" />
              }
            } }
            />

            <Route exact path="/tickets/solved-tickets" render={ (props) => {
              if (this.props.activeUser) {
                return <SolvedTicketsContainer
                  { ...props }
                  { ...this.props }
                  class={ this.state.classes }
                  allUsers={ this.state.users }
                  reverseTickets={ this.state.reverseTickets }
                  allTeacherTickets={ this.state.currentTicketUsers }
                />
              } else {
                return <Redirect to="/login" />
              }
            } }
            />
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(ApplicationViews);
