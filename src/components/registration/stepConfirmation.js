import React, { Component } from 'react';
import { Button, Form, Message, Container, Grid, Segment, Header, Card } from 'semantic-ui-react';
import { register } from '../auth/userManager';

const displayStyle = {
  display: "none"
}

const FormSuccess = () => (
  <Form style={ displayStyle } className="registerFormSuccess" success >
    <Message success header='Form Completed' content="Thank you for registering!" />
  </Form >
)

export default class StepConfirmation extends Component {
  saveAndContinue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  }

  // submit = () => {
  //   const ref = this.storageRef.child(`${Date.now()}`);

  //   ref.put(this.state.image)
  //     .then(data => data.ref.getDownloadURL())
  //     .then(url => {
  //       register({
  //         name: this.state.name,
  //         username: this.state.username,
  //         email: this.state.email,
  //         password: this.state.password,
  //         image: url,
  //         blurb: this.state.blurb,
  //         available: "",
  //         classId: "",
  //         student: false
  //       }).then(newUser => {
  //         this.props.onRegister(newUser);
  //         this.props.history.push('/');
  //       });
  //     }).then(() => {
  //       setTimeout(() => {
  //         document.querySelector(".registerFormSuccess").style.display = "block";
  //         document.querySelector(".form-fields").reset()
  //       }, 200)
  //     })
  //     .then(() => { setTimeout(() => { this.props.history.push("/dashboard/teacher") }, 2000) })
  // }

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  }

  render() {
    const { values: { name, username, email, blurb, classId, student } } = this.props;

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
                  <Card.Description>Class: { classId }</Card.Description>
                  <Card.Description>Status: { student }</Card.Description>
                </Card.Content>
              </Card>

              <Button className="ui left floated" onClick={ this.back }>Back</Button>
              <Button className="ui right floated" onClick={ this.submit }>Register</Button>
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
      </Container>
    )
  }
}