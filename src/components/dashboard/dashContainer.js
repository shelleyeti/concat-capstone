import React, { Component } from 'react';
import { Button, Container } from 'semantic-ui-react';
import UserProfile from './userProfile';
import UserImage from './userImage';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import './dashboard.css';

export default class TeacherContainer extends Component {
  storageRef = firebase.storage().ref('userImage');
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
    const imageUploadFiles = document.querySelector(".choose-upload-button input[type='file']").files
    if (imageUploadFiles.length > 0) {
      const ref = this.storageRef.child(`${Date.now()}`);

      ref.put(imageUploadFiles[0])
        .then(data => data.ref.getDownloadURL())
        .then(url => {
          this.props.editUser({
            id: this.props.activeUser.id,
            name: this.props.activeUser.name,
            username: this.props.activeUser.username,
            blurb: this.props.activeUser.blurb,
            email: this.props.activeUser.email,
            password: null,
            image: url,
            available: this.props.activeUser.available,
            student: this.props.activeUser.student,
            classId: this.props.activeUser.classId
          })
        })
    }
    this.setState(
      { editModeImage: false }
    )
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
      image: this.props.activeUser.image,
      available: this.props.activeUser.available,
      student: this.props.activeUser.student,
      classId: this.props.activeUser.classId
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

      <Container className="profile-container">
        <h1>Welcome back { this.props.activeUser.name }</h1>
        <div className="image-section">
          <UserImage { ...this.props }
            editMode={ this.state.editModeImage }
          />
          { this.state.editModeImage ? <Button className="trolley" onClick={ this.handleSaveImage }>Save Image</Button> : <Button className="trolley" onClick={ this.handleEditImage }>Edit Image</Button> }
        </div>
        <div className="input-fields-section">
          <UserProfile  { ...this.props }
            editMode={ this.state.editMode }
          />
          { this.state.editMode ? <Button className="trolley" onClick={ this.handleSaveState }>Save</Button> : <Button className="trolley" onClick={ this.handleEditState }>Edit</Button> }
        </div>
      </Container>
    );
  }
}
