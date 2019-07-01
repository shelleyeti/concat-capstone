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
    student: "",
    classId: this.props.activeUser.classId
  }

  displayConditions = () => {
    if (this.props.editMode) {
      //edit mode true
      return <div>
        <Card centered fluid className="card-dash">
          <div className="input-fields">
            <div>
              <span>
                <label>Name: </label>
                <Input type="text" id="name" defaultValue={ this.props.activeUser.name } />
              </span>
            </div>
            <div>
              <span>
                <label>Userame: </label>
                <Input type="text" id="username" defaultValue={ this.props.activeUser.username } />
              </span>
            </div>
            <div>
              <span>
                <label>Blurb: </label>
                <Input type="text" id="blurb" defaultValue={ this.props.activeUser.blurb } />
              </span>
            </div>
            <div>
              <span>
                <label>Email: </label>
                <Input type="text" id="email" defaultValue={ this.props.activeUser.email } />
              </span>
            </div>
            <div>
              <span>
                <label>Current Password: </label>
                <Input type="password" id="password" />
              </span>
            </div>
            <div>
              <span>
                <label>New Password: </label>
                <Input type="password" id="newPassword" />
              </span>
            </div>
          </div>
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