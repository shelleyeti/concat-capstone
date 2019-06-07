import React, { Component } from 'react';
import { Form, Button, Container, Grid, Segment, Header, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { login } from '../auth/userManager';

export default class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  submit = () => {
    login(this.state.email, this.state.password)
      .then((user) => {
        this.props.onLogin(user);
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
                  Log In
                </Header>
                <Form className="login--form" onSubmit={ this.submit }>
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
                  <Button fluid content="Log in" color="purple" />
                </Form>
                <Message className="auth--message">
                  Not registered yet? <Link to="/register">Sign Up</Link>
                </Message>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}