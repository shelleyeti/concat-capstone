import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import UserProfile from './userProfile';
import UserImage from './userImage';
import * as firebase from 'firebase/app';
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
      name: this.props.activeUser.name,
      username: this.props.activeUser.username,
      blurb: this.props.activeUser.blurb,
      email: this.props.activeUser.email,
      password: null,
      image: image
    })
    this.setState(
      { editModeImage: false }
    )
  }

  handleKeepCurrentImage = () => {
    // <Button outline onClick={ this.handleKeepCurrentImage }>Keep Current Image</Button>
  }

  reauthenticate = (currentPassword) => {
    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  changePassword = (currentPassword, newPassword) => {
    this.reauthenticate(currentPassword).then(() => {
      const user = firebase.auth().currentUser;
      user.updatePassword(newPassword).then(() => {
        alert("Password updated!");
      }).catch((error) => { console.log(error); });
    }).catch((error) => { console.log(error); });
  }

  changeEmail = (currentPassword, newEmail) => {
    this.reauthenticate(currentPassword).then(() => {
      const user = firebase.auth().currentUser;
      user.updateEmail(newEmail).then(() => {
        console.log("Email updated!");
      }).catch((error) => { console.log(error); });
    }).catch((error) => { console.log(error); });
  }

  handleSaveState = () => {
    const name = document.querySelector("#name").value
    const username = document.querySelector("#username").value
    const blurb = document.querySelector("#blurb").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    const newPassword = document.querySelector("#newPassword").value
    if (password === "" && email !== this.props.activeUser.email) {
      alert(`please enter you password to change your email`)
      return
    }

    if (password === "" && newPassword !== "") {
      alert(`please enter you password to change your password`)
      return
    }

    this.props.editUser({
      id: this.props.activeUser.id,
      name: name,
      username: username,
      blurb: blurb,
      email: email,
      password: null,
      image: this.props.activeUser.image
    })
    if (password !== "" && newPassword !== "" && password !== newPassword)
      this.changePassword(password, newPassword)

    if (password !== "" && email !== this.props.activeUser.email)
      this.changeEmail(password, email)

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
          { this.state.editModeImage ? <Button onClick={ this.handleSaveImage }>Save Image</Button> : <Button onClick={ this.handleEditImage }>Edit Image</Button> }
        </div>
        <div className="input-fields-section">
          <UserProfile  { ...this.props }
            editMode={ this.state.editMode }
          />
          { this.state.editMode ? <Button onClick={ this.handleSaveState }>Save</Button> : <Button onClick={ this.handleEditState }>Edit</Button> }
        </div>
      </div>
    );
  }
}
