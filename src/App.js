import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ProfileForm from './components/ProfileForm';
import ProfileList from './components/ProfileList';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { getUserFromLocalStorage, logout } from './auth/userManager';

class App extends Component {
  state = {
    user: getUserFromLocalStorage()
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/login" render={ (props) =>
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
          } } />
          <Route exact path="/profiles/new" component={ ProfileForm }></Route>
          <Route exact path="/profiles" component={ ProfileList }></Route>
        </Router>
      </div>
    );
  }
}

export default App;
