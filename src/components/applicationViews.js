import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import TicketForm from './tickets/ticketForm';
import TicketContainer from './tickets/activeTickets/ticketContainer';
import TicketsManager from '../modules/ticketManager';
import DashContainer from './dashboard/dashContainer'
import UsersManager from '../modules/userManager';
import CurrentTicketManager from '../modules/currentTicketUsers';
import SolvedTicketsContainer from './tickets/solvedTickets/solvedContainer';
import ClassManager from '../modules/classes';
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

  deleteClass = id => {
    const newState = {};
    ClassManager.deleteClass(id)
      .then(ClassManager.getAllClasses)
      .then(cohort => (newState.classes = cohort))
      .then(() => {
        this.props.history.push("/classes/all-classes");
        this.setState(newState);
      });
  };

  addClass = newCohort => {
    const newState = {};
    return ClassManager.saveClass(newCohort)
      .then(() => ClassManager.getAllClasses())
      .then(cohort => newState.classes = cohort)
      .then((cohort) => {
        this.props.history.push("/classes/all-classes")
        this.setState(newState)
        return cohort;
      });
  };

  editClass = editCohort => {
    const newState = {};
    ClassManager.editClass(editCohort)
      .then(() => ClassManager.getAllClasses())
      .then(cohort => (newState.classes = cohort))
      .then(() => {
        this.props.history.push("/classes/all-classes");
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
      .then(ClassManager.getAllClasses)
      .then(classes => { newState.classes = classes })
      // .then(Messages.getAllMessages)
      // .then(messages => { newState.messages = messages })
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
        .then(ClassManager.getAllClasses)
        .then(classes => { newState.classes = classes })
        // .then(Messages.getAllMessages)
        // .then(messages => { newState.messages = messages })
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
                return <Redirect to="/" />
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

            <Route exact path="/tickets/my-tickets" render={ (props) => {
              if (this.props.activeUser) {
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
              } else {
                return <Redirect to="/" />
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
                return <Redirect to="/" />
              }
            } }
            />

            <Route exact path="/tickets/new" render={ (props) => {
              if (this.props.activeUser) {
                return <TicketForm
                  { ...props }
                  { ...this.props }
                  allUsers={ this.state.users }
                  ticket={ this.state.tickets }
                  editTicket={ this.editTicket }
                />
              } else {
                return <Redirect to="/" />
              }
            } }
            />

            <Route exact path="/dashboard/teacher" render={ (props) => {
              if (this.props.activeUser) {
                return <DashContainer
                  { ...props }
                  { ...this.props }
                  user={ this.state.users }
                  editUser={ this.editUser }
                />
              } else {
                return <Redirect to="/" />
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
