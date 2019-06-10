import React, { Component } from 'react';
import { getUserFromLocalStorage } from './components/auth/userManager';
import Logo from './components/logo/logo';
import Navbar from './components/navbar/navbar';
import { logout } from './components/auth/userManager';
import ApplicationViews from './components/applicationViews';
import './App.css';

export default class App extends Component {
  state = {
    activeUser: getUserFromLocalStorage()
  }

  setUser = (user) => {
    //puts the active user in local storage, necessary for editing user profile
    localStorage.setItem("credentials", JSON.stringify(user));
    this.setState({
      activeUser: user
    })
  }

  render() {
    return (
      <React.Fragment>
        <Logo />
        <Navbar setUser={ this.setUser } activeUser={ this.state.activeUser } onLogout={ logout } />
        <ApplicationViews setUser={ this.setUser } activeUser={ this.state.activeUser } />
      </React.Fragment>
    );
  }
}