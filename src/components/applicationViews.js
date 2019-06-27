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
import firebase from 'firebase/app';
import 'firebase/database';


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
      .then((tickets) => {
        this.props.history.push("/tickets/my-tickets")
        this.setState(newState)
        return tickets;
      });
  };

  editTicket = editedTicket => {
    const newState = {};
    TicketsManager.editTicket(editedTicket)
      .then(() => {
        this.props.history.push("/tickets/my-tickets");
        this.setState(newState);
      });
  };

  deleteUser = id => {
    const newState = {};
    UsersManager.deleteUser(id)
      .then(() => {
        this.props.history.push("/dashboard");
        this.setState(newState);
      });
  };

  addUser = user => {
    const newState = {};
    return UsersManager.saveUser(user)
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
      .then(() => {
        this.props.setUser(editedUser);
        this.props.history.push("/dashboard");
        this.setState(newState);
      });
  };

  deleteCurrentTicketUser = id => {
    const newState = {};
    CurrentTicketManager.deleteCurrentTicketUser(id)
      .then(() => {
        this.props.history.push("/tickets/my-tickets");
        this.setState(newState);
        return id
      });
  };

  addCurrentTicketUser = teacherTicket => {
    const newState = {};
    return CurrentTicketManager.saveCurrentTicketUser(teacherTicket)
      .then((ticket) => {
        this.props.history.push("/tickets/my-tickets")
        this.setState(newState)
        return ticket;
      });
  };

  editCurrentTicketUser = editedTicket => {
    const newState = {};
    CurrentTicketManager.editCurrentTicketUser(editedTicket)
      .then(() => {
        this.props.history.push("/tickets/my-tickets");
        this.setState(newState);
      });
  };

  deleteJoin = id => {
    const newState = {};
    JoinedTicketManager.deleteJoinedTicket(id)
      .then(() => {
        this.props.history.push("/tickets/my-tickets");
        this.setState(newState);
      });
  };

  addJoin = newJoin => {
    const newState = {};
    return JoinedTicketManager.saveJoinedTicket(newJoin)
      .then((joinedTicket) => {
        this.props.history.push("/tickets/my-tickets")
        this.setState(newState)
        return joinedTicket;
      });
  };

  editJoin = editJoinedTicket => {
    const newState = {};
    JoinedTicketManager.editJoinedTicket(editJoinedTicket)
      .then(() => {
        this.props.history.push("/tickets/my-tickets");
        this.setState(newState);
      });
  };



  componentDidMount() {
    const newState = {};
    let database = firebase.database();

    let ticketsRef = database.ref('tickets/');
    ticketsRef.on('value', (tickets) => {
      let ticketArr = [];
      let allTickets = tickets.val();
      for (let ticket in allTickets) {
        ticketArr.push(allTickets[ticket]);
      }
      newState.tickets = ticketArr;
      this.setState(newState);
    });

    let usersRef = database.ref('users/');
    usersRef.on('value', (users) => {
      let userArr = [];
      let allUsers = users.val();
      for (let user in allUsers) {
        userArr.push(allUsers[user]);
      }
      newState.users = userArr;
      this.setState(newState);
    });

    let joinedTicketsRef = database.ref('joinedTickets/');
    joinedTicketsRef.on('value', (joinedTickets) => {
      let joinedTicketsArr = [];
      let allJoinedTickets = joinedTickets.val();
      for (let joinedTicket in allJoinedTickets) {
        joinedTicketsArr.push(allJoinedTickets[joinedTicket]);
      }
      newState.joinedTickets = joinedTicketsArr;
      this.setState(newState);
    });

    let classTicketsRef = database.ref('classTickets/');
    classTicketsRef.on('value', (classTickets) => {
      let classTicketsArr = [];
      let allClassTickets = classTickets.val();
      for (let classTicket in allClassTickets) {
        classTicketsArr.push(allClassTickets[classTicket]);
      }
      newState.classTickets = classTicketsArr;
      this.setState(newState);
    });

    let currentTicketUsersRef = database.ref('currentTicketUsers/');
    currentTicketUsersRef.on('value', (currentTicketUsers) => {
      localStorage.setItem("notifyModalOpenAlready", false);

      let currentTicketUsersArr = [];
      let allCurrentTicketUsers = currentTicketUsers.val();
      for (let currentTicketUser in allCurrentTicketUsers) {
        currentTicketUsersArr.push(allCurrentTicketUsers[currentTicketUser]);
      }
      newState.currentTicketUsers = currentTicketUsersArr;
      this.setState(newState);
    });

    let classesRef = database.ref('classes/');
    classesRef.on('value', (classes) => {
      let classesArr = [];
      let allClasses = classes.val();
      for (let oneClass in allClasses) {
        classesArr.push(allClasses[oneClass]);
      }
      newState.classes = classesArr;
      this.setState(newState);
    });

    let ticketsInReverseRef = database.ref('/tickets/').orderByChild("submitTime");
    ticketsInReverseRef.on('value', (tickets) => {
      let ticketArr = [];
      let allTickets = tickets.val();
      for (let ticket in allTickets) {
        ticketArr.push(allTickets[ticket]);
      }
      newState.reverseTickets = ticketArr.reverse();
      this.setState(newState);
    });
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.location.pathname !== prevProps.location.pathname) {
  //     const newState = {};
  //     TicketsManager.getAllTickets()
  //       .then(tickets => { newState.tickets = tickets })
  //       .then(UsersManager.getAllUsers)
  //       .then(users => { newState.users = users })
  //       .then(CurrentTicketManager.getAllCurrentTicketUsers)
  //       .then(ticket => { newState.currentTicketUsers = ticket })
  //       .then(TicketsManager.getAllTicketsReverse)
  //       .then(reverseTicket => { newState.reverseTickets = reverseTicket })
  //       .then(ClassManager.getAllClasses)
  //       .then(classes => { newState.classes = classes })
  //       .then(JoinedTicketManager.getAllJoinedTickets)
  //       .then(joinedTickets => { newState.joinedTickets = joinedTickets })
  //       .then(() => this.setState(newState));
  //   }
  // }

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
                  allTeacherTickets={ this.state.currentTicketUsers }
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
                  joinedTickets={ this.state.joinedTickets }
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
