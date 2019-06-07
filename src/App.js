import React, { Component } from 'react'
import { getUserFromLocalStorage } from './components/auth/userManager'
import Logo from './components/logo/logo'
import Navbar from './components/navbar/navbar'
import ApplicationViews from './components/applicationViews';
import './App.css'

class App extends Component {
  state = {
    user: getUserFromLocalStorage()
  }

  render() {
    return (
      <React.Fragment>
        <Logo />
        <Navbar />
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default App;
