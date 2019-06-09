import React, { Component } from 'react';
import { getUserFromLocalStorage } from './components/auth/userManager';
import Logo from './components/logo/logo';
import Navbar from './components/navbar/navbar';
import { logout } from './components/auth/userManager';
import ApplicationViews from './components/applicationViews';
import './App.css';

export default class App extends Component {
  state = {
    user: getUserFromLocalStorage()
  }

  render() {
    return (
      <React.Fragment>
        <Logo />
        <Navbar onLogout={ logout } />
        <ApplicationViews />
      </React.Fragment>
    );
  }
}