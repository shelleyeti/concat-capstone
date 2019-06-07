import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { withRouter } from 'react-router'
import ProfileForm from './tickets/ticketForm'
import ProfileList from './tickets/ticketList'
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


  componentDidMount() {
    const newState = {};
    // Events.getAllEvents()
    //   .then(events => { newState.events = events })
    //   .then(Friends.getAllFriends)
    //   .then(friends => { newState.friends = friends })
    //   .then(News.getAllNews)
    //   .then(news => { newState.news = news })
    //   .then(Tasks.getAllTasks)
    //   .then(tasks => { newState.tasks = tasks })
    //   .then(Users.getAllUsers)
    //   .then(users => { newState.users = users })
    //   .then(Messages.getAllMessages)
    //   .then(messages => { newState.messages = messages })
    //   .then(() => this.setState(newState));
  }

  // isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

  render() {
    return (
      <>
        <div className="App">
          <Router>
            {/* <Route path="/login" render={ (props) =>
              <Login { ...props } onLogin={ (user) => this.setState({ user: user }) } /> }
            />
            <Route path="/register" render={ (props) =>
              <Register { ...props } onRegister={ (user) => this.setState({ user: user }) } /> }
            />
            <Route exact path="/" render={ (props) => {
              return this.state.user ? (
                <Home { ...props } user={ this.state.user } onLogout={ logout }
                />
              ) : (
                  <Redirect to="/login" />
                )
            } } /> */}
            <Route exact path="/tickets/new" component={ ProfileForm }></Route>
            <Route exact path="/tickets" component={ ProfileList }></Route>
          </Router>
        </div>
      </>
    );
  }
}
export default withRouter(ApplicationViews);
