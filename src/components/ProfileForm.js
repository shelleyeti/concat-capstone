import React from 'react';
import { Header, Form, Grid, Button } from 'semantic-ui-react'
//2 imports
import * as firebase from 'firebase/app'
import 'firebase/storage'
import { saveProfile } from '../APIManager/profiles'

class ProfileForm extends React.Component {
  //reference to dicterory in bucket
  storageRef = firebase.storage().ref("profiles");

  state = {
    username: '',
    about: '',
    photo: null
  };

  saveProfile = () => {
    //refence to an image in bucket about to be saved 
    const ref = this.storageRef.child(`${Date.now()}`)
    //uploads to firebase
    ref.put(this.state.photo)
      //gets image name that was uploaded
      .then(data => data.ref.getDownloadURL())
      .then(console.log(`success`))
      .then(url => {
        saveProfile({
          username: this.state.username,
          about: this.state.about,
          photoURL: url
        })
      })
  }

  render() {
    return (
      <div className="image-form--container">
        <Header>
          Add a Profile
        </Header>
        <Grid>
          <Grid.Row centered>
            <Grid.Column largeScreen={ 4 } computer={ 6 } tablet={ 8 } mobile={ 12 }>
              <Form onSubmit={ this.saveProfile }>
                <Form.Field
                  control="input"
                  type="text"
                  label="Username"
                  onChange={ (e) => this.setState({ username: e.target.value }) }
                  placeholder="Username" />
                <Form.Field
                  control="textarea"
                  type="text"
                  label="About"
                  onChange={ (e) => this.setState({ about: e.target.value }) }
                  placeholder="About me" />
                <Form.Field
                  control="input"
                  type="file"
                  label="photo"
                  //files don't use .value and come through as an array
                  onChange={ (e) => this.setState({ photo: e.target.files[0] }) }
                  placeholder="Photo" />
                <Button type="submit" content="Save" color="purple" />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default ProfileForm;