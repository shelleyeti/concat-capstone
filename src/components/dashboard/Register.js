import React, { Component } from 'react';
import { Form, Button, Container, Grid, Message, Segment, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { register } from '../auth/userManager';

export default class Register extends Component {
  state = {
    email: '',
    username: '',
    password: ''
  }

  submit = () => {
    register(this.state)
      .then(newUser => {
        this.props.onRegister(newUser);
        this.props.history.push('/');
      });
  }

  render() {
    return (
      <Container className="auth--container">
        <Grid>
          <Grid.Row centered>
            <Grid.Column largeScreen={ 6 } computer={ 6 } tablet={ 10 } mobile={ 16 }>
              <Segment>
                <Header as="h1" textAlign="center">
                  Register
                </Header>
                <Form className="register--form" onSubmit={ this.submit }>
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
                  <Form.Field control="input" type="hidden" />
                  <Button fluid content="Register" color="purple" />
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