import React, { Component } from 'react';
import { Form, Button, Container, Grid, Message, Segment, Header, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { register } from '../auth/userManager';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import './dashboard.css';

export default class Register extends Component {
  storageRef = firebase.storage().ref('userImage');

  state = {
    name: "",
    username: "",
    email: "",
    password: null,
    image: "",
    blurb: "",
    available: "",
    classId: "",
    student: false
  }

  submit = () => {
    const ref = this.storageRef.child(`${Date.now()}`);

    ref.put(this.state.image)
      .then(data => data.ref.getDownloadURL())
      .then(url => {
        register({
          name: this.state.name,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          image: url,
          blurb: this.state.blurb,
          available: "",
          classId: "",
          student: false
        }).then(newUser => {
          this.props.onRegister(newUser);
          this.props.history.push('/');
        });
      })
  }

  render() {

    return (
      <Container className="auth-container">
        <Grid>
          <Grid.Row centered>
            <Grid.Column largeScreen={ 6 } computer={ 6 } tablet={ 10 } mobile={ 16 }>
              <Segment>
                <Header as="h1" textAlign="center">
                  Register
                </Header>
                <Form className="register-form" onSubmit={ this.submit }>
                  <Form.Field
                    control="input"
                    type="text"
                    label="Full Name"
                    placeholder="Enter your first and last name"
                    onChange={ (e) => this.setState({ name: e.target.value }) }
                  />
                  <Form.Field
                    control="input"
                    type="text"
                    label="Username"
                    placeholder="Enter a username"
                    onChange={ (e) => this.setState({ username: e.target.value }) }
                  />
                  <Form.Field
                    control="input"
                    type="email"
                    label="Email Address"
                    placeholder="Enter an email"
                    onChange={ (e) => this.setState({ email: e.target.value }) }
                  />
                  <Form.Field
                    control="input"
                    type="password"
                    label="Password"
                    placeholder="Password"
                    onChange={ (e) => this.setState({ password: e.target.value }) }
                  />
                  <Form.Field
                    control="input"
                    type="text"
                    label="Blurb"
                    placeholder="Enter a short blurb about yourself"
                    onChange={ (e) => this.setState({ blurb: e.target.value }) }
                  />
                  <Form.Radio
                    label='Student'
                    checked={ this.state.student === true }
                    onChange={ (e, { value }) => {
                      this.setState({ student: true })
                    } }
                  />
                  <Form.Radio
                    label='Teacher'
                    checked={ this.state.student === false }
                    onChange={ (e, { value }) => {
                      this.setState({ student: false })
                    } }
                  />
                  <Form.Field>
                    <Dropdown item simple text='Select a Class'>
                      <Dropdown.Menu>
                        <Dropdown.Item value="32">
                          Cohort 32
                        </Dropdown.Item>
                        <Dropdown.Item>
                          Cohort 33
                        </Dropdown.Item>
                        <Dropdown.Item>
                          Night Class
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Field>
                  <Form.Field
                    className="choose-upload-button"
                    control="input"
                    type="file"
                    label="Photo"
                    //files don't use .value and come through as an array
                    onChange={ (e) => this.setState({ image: e.target.files[0] }) }
                    placeholder="Photo" />
                  <Form.Field control="input" type="hidden" />
                  <Button className="trolley" fluid content="Register" />
                </Form>
                <Message className="auth--message">
                  Already registered? <Link to="/login">Log In</Link>
                </Message>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}