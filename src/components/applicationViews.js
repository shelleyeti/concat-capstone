import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { withRouter } from 'react-router'
import TicketForm from './tickets/ticketForm'
import TicketContainer from './tickets/ticketContainer'
import TicketsManager from '../modules/ticketManager'
import Login from './dashboard/Login'
import Register from './dashboard/Register'
import Home from './dashboard/Home'
import { logout } from './auth/userManager'

class ApplicationViews extends Component {
  state = {
    users: [],
    tickets: [],
    joinedTickets: [],
    classTickets: [],
    classes: []
  };
  //calls
  deleteTicket = id => {
    const newState = {};
    TicketsManager.deleteTicket(id)
      .then(TicketsManager.getAllTickets)
      .then(ticket => (newState.tickets = ticket))
      .then(() => {
        this.props.history.push("/tickets");
        this.setState(newState);
      });
  };

  addTicket = ticket => {
    const newState = {};
    return TicketsManager.saveTicket(ticket)
      .then(() => TicketsManager.getAllTickets())
      .then(ticket => newState.tickets = ticket)
      .then((tickets) => {
        this.props.history.push("/tickets")
        this.setState(newState)
        //return tasks so it can be used in the form
        return tickets;
      });
  };

  editTicket = editedTicket => {
    const newState = {};
    TicketsManager.editTicket(editedTicket)
      .then(() => TicketsManager.getAllTickets())
      .then(ticket => (newState.tickets = ticket))
      .then(() => {
        this.props.history.push("/tickets");
        this.setState(newState);
      });
  };


  componentDidMount() {
    const newState = {};
    TicketsManager.getAllTickets()
      .then(tickets => { newState.tickets = tickets })
      // .then(Friends.getAllFriends)
      // .then(friends => { newState.friends = friends })
      // .then(News.getAllNews)
      // .then(news => { newState.news = news })
      // .then(Tasks.getAllTasks)
      // .then(tasks => { newState.tasks = tasks })
      // .then(Users.getAllUsers)
      // .then(users => { newState.users = users })
      // .then(Messages.getAllMessages)
      // .then(messages => { newState.messages = messages })
      .then(() => this.setState(newState));
  }

  // isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

  render() {
    return (
      <>
        <div className="App">
          <Router>
            {/* <Route path="/login" render={ (props) =>
              <Login { ...props }
                onLogin={ (user) => this.setState({ user: user }) } /> }
            />
            <Route path="/register" render={ (props) =>
              <Register { ...props }
                onRegister={ (user) => this.setState({ user: user }) } /> }
            />
            <Route exact path="/" render={ (props) => {
              return this.state.user ? (
                <Home { ...props }
                  user={ this.state.user }
                  onLogout={ logout }
                />
              ) : (
                  <Redirect to="/login" />
                )
            } } /> */}
            <Route exact path="/tickets" render={ (props) => {
              // if (this.isAuthenticated()) {
              return <TicketContainer
                { ...props }
                // activeUser={ this.props.activeUser }
                ticket={ this.state.tickets }
                addTicket={ this.addTicket }
                editTicket={ this.editTicket }
              />
              // } else {
              //   return <Redirect to="/" />
              // }
            } }
            />
            <Route exact path="/tickets/new" component={ TicketForm }></Route>
          </Router>
        </div>
      </>
    );
  }
}
export default withRouter(ApplicationViews);
