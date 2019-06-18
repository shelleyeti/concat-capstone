import React, { Component } from 'react';
import { Card, Input } from 'semantic-ui-react';
import 'firebase/auth';
import './dashboard.css';

export default class UserProfile extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: "",
    newPassword: "",
    image: "",
    blurb: "",
    available: "",
    student: ""
  }

  displayConditions = () => {
    if (this.props.editMode) {
      //edit mode true
      return <div>
        <Card centered fluid className="card-dash">
          <span>
            <label>Name: </label>
            <Input type="text" id="name" defaultValue={ this.props.activeUser.name } />
          </span>
          <span>
            <label>Userame: </label>
            <Input type="text" id="username" defaultValue={ this.props.activeUser.username } />
          </span>
          <span>
            <label>Blurb: </label>
            <Input type="text" id="blurb" defaultValue={ this.props.activeUser.blurb } />
          </span>
          <span>
            <label>Email: </label>
            <Input type="text" id="email" defaultValue={ this.props.activeUser.email } />
          </span>
          <span>
            <label>Current Password: </label>
            <Input type="password" id="password" />
          </span>
          <span>
            <label>New Password: </label>
            <Input type="password" id="newPassword" />
          </span>
        </Card>
      </div >
    } else {
      //edit mode false
      return <div>
        <Card centered fluid className="card-dash">
          <span>
            <label>Name: </label>
            { this.props.activeUser.name }
          </span>
          <span>
            <label>Userame: </label>
            { this.props.activeUser.username }
          </span>
          <span>
            <label>Blurb: </label>
            { this.props.activeUser.blurb }
          </span>
          <span>
            <label>Email: </label>
            { this.props.activeUser.email }
          </span>
        </Card>
      </div >

    }
  }

  render() {
    return (
      <div>
        { this.displayConditions() }
      </div>
    );
  }
}