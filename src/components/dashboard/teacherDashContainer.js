import React, { Component } from 'react';
import { Button, Card, Image, Form, TextArea } from 'semantic-ui-react';
import UserProfile from './userProfile';
import UserImage from './userImage';
import './dashboard.css';

export default class TeacherContainer extends Component {
  state = {
    editMode: false,
    editModeImage: false
  }

  handleEditState = () => {
    this.setState(
      { editMode: true }
    )
  }

  handleEditImage = () => {
    this.setState(
      { editModeImage: true }
    )
  }

  handleSaveImage = () => {
    const image = document.querySelector("#user-image").value
    this.props.editUser({
      id: this.props.activeUser.id,
      firstName: this.props.activeUser.firstName,
      lastName: this.props.activeUser.lastName,
      userName: this.props.activeUser.userName,
      email: this.props.activeUser.email,
      password: this.props.activeUser.password,
      image: image
    })
    this.setState(
      { editModeImage: false }
    )
  }

  handleSaveState = () => {
    const name = document.querySelector("#name").value
    const username = document.querySelector("#username").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    this.props.editUser({
      id: this.props.activeUser.id,
      name: name,
      username: username,
      email: email,
      password: password,
      image: this.props.activeUser.image
    })
    this.setState(
      { editMode: false }
    )
  }

  render() {
    return (
      <div className="profile-container">
        <h1>Welcome back { this.props.activeUser.name }</h1>
        <div className="image-section">
          <UserImage { ...this.props }
            editMode={ this.state.editModeImage }
          />
          { this.state.editModeImage ? <Button outline onClick={ this.handleSaveImage }>Save Image</Button> : <Button outline onClick={ this.handleEditImage }>Edit Image</Button> }
        </div>
        <div className="input-fields-section">
          <UserProfile  { ...this.props }
            editMode={ this.state.editMode }
          />
          { this.state.editMode ? <Button outline onClick={ this.handleSaveState }>Save</Button> : <Button outline onClick={ this.handleEditState }>Edit</Button> }
        </div>
      </div>
    );
  }
}
