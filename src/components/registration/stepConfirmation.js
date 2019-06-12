import React, { Component } from 'react';
import { Button, Form, Message, Container, Grid, Segment, Header, Card } from 'semantic-ui-react';
import { register } from '../auth/userManager';
import * as firebase from 'firebase/app';
import 'firebase/storage';

const displayStyle = {
  display: "none"
}

const RegisterSuccess = () => (
  <Form style={ displayStyle } className="registerFormSuccess" success >
    <Message success header='Form Completed' content="Thank you for registering!" />
  </Form >
)

export default class StepConfirmation extends Component {
  storageRef = firebase.storage().ref('userImage');

  saveAndContinue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  }

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  }

  render() {
    const { values: { name, username, email, blurb, classId, student, image, password, cohortName } } = this.props;
    const submit = () => {
      const ref = this.storageRef.child(`${Date.now()}`);

      ref.put(image)
        .then(data => data.ref.getDownloadURL())
        .then(url => {
          register({
            name: name,
            username: username,
            email: email,
            password: password,
            image: url,
            blurb: blurb,
            available: "",
            classId: classId,
            student: student
          }).then(newUser => {
            this.props.onRegister(newUser);
            // this.props.history.push('/dashboard/teacher');
          });
        }).then(() => {
          setTimeout(() => {
            document.querySelector(".registerFormSuccess").style.display = "block";
          }, 200)
        })
        .then(() => { setTimeout(() => { this.props.history.push("/dashboard/teacher") }, 2000) })
    }

    return (

      <Container className="auth-container ui grid container">
        <Grid.Row centered>
          <Grid.Column className="six wide">
            <Segment>
              <Header as="h1" textAlign="center">
                Confirm your Details
              </Header>

              <Card fluid>
                <Card.Content>
                  <Card.Description>Full Name: { name }</Card.Description>
                  <Card.Description>Username: { username }</Card.Description>
                  <Card.Description>Email: { email }</Card.Description>
                  <Card.Description>Blurb: { blurb }</Card.Description>
                  <Card.Description>Class: { cohortName }</Card.Description>
                  <Card.Description>Status: { student }</Card.Description>
                  <Card.Description>Image: { (image != "" && image != null ? image.name : "") }</Card.Description>
                </Card.Content>
              </Card>

              <Button className="ui left floated" onClick={ this.back }>Back</Button>
              <Button className="ui right floated" onClick={ submit }>Register</Button>
              <div className="ui four steps">
                <div className="ui disabled step">
                  User Details
                </div>
                <div className="ui disabled step">
                  Class Details
                </div>
                <div className="ui disabled step">
                  Image
                </div>
                <div className="ui active step">
                  Confirm
                </div>
              </div>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <RegisterSuccess />
      </Container>
    )
  }
}