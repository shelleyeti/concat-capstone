import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { getUserFromSessionStorage } from './components/auth/userManager';
import Logo from './components/logo/logo';
import Navbar from './components/navbar/navbar';
import { logout } from './components/auth/userManager';
import ApplicationViews from './components/applicationViews';
import TicketSearch from './modules/ticketManager'
import './App.css';

class App extends Component {
  state = {
    activeUser: getUserFromSessionStorage(),
    searchResults: []
  }

  setUser = (user) => {
    //puts the active user in session storage, necessary for editing user profiles
    sessionStorage.setItem("user", JSON.stringify(user));
    this.setState({
      activeUser: user
    })
  }

  clearActiveUser = (user) => {
    this.setState({
      activeUser: user
    })
  }

  getSearchResults = input => {
    TicketSearch.search(input).then(results => {
      this.setState({ searchResults: results });
      this.props.history.push("/search")
    });
  };

  render() {

    return (
      <React.Fragment>
        <Logo />
        <Navbar
          setUser={ this.setUser }
          clearActiveUser={ this.clearActiveUser }
          activeUser={ this.state.activeUser }
          onLogout={ logout }
          getSearchResults={ this.getSearchResults }
          searchResults={ this.state.searchResults }
        />
        <ApplicationViews
          setUser={ this.setUser }
          activeUser={ this.state.activeUser }
          searchResults={ this.state.searchResults }
        />
      </React.Fragment>
    );
  }
}

export default withRouter(App)