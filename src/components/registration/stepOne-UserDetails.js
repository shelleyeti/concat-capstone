import React, { Component } from 'react';
import { Form, Button, Container, Grid, Segment, Header } from 'semantic-ui-react';

export default class StepOneUserDetails extends Component {
  saveAndContinue = (e) => {
    e.preventDefault()
    this.props.nextStep()
  }

  render() {
    const { values } = this.props;

    return (
      <Container className="auth-container ui grid container">
        <Grid.Row centered>
          <Grid.Column className="six wide">
            <Segment>
              <Header as="h1" textAlign="center">
                User Details
              </Header>

              <Form className="register-form">
                <Form.Field
                  control="input"
                  type="text"
                  label="Full Name"
                  placeholder="Enter your first and last name"
                  onChange={ this.props.handleChange('name') }
                  defaultValue={ values.name }
                />
                <Form.Field
                  control="input"
                  type="email"
                  label="Email Address"
                  placeholder="Enter an email"
                  onChange={ this.props.handleChange('email') }
                  defaultValue={ values.email }
                />
                <Form.Field
                  control="input"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  onChange={ this.props.handleChange('password') }
                />
                <Button className="ui right floated" onClick={ this.saveAndContinue }>Save and Continue </Button>
              </Form>
              <div className="ui four steps">
                <div className="ui active step">
                  User Details
                </div>
                <div className="ui disabled step">
                  Class Details
                </div>
                <div className="ui disabled step">
                  Image
                </div>
                <div className="ui disabled step">
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