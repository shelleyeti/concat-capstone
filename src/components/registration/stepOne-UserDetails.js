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
                  onChange={ this.props.handleChange('firstName') }
                  defaultValue={ values.firstName }
                />
                <Form.Field
                  control="input"
                  type="text"
                  label="Username"
                  placeholder="Enter a username"
                  onChange={ this.props.handleChange('lastName') }
                  defaultValue={ values.lastName }
                />
                <Form.Field
                  control="input"
                  type="email"
                  label="Email Address"
                  placeholder="Enter an email"
                  onChange={ this.props.handleChange('email') }
                  defaultValue={ values.email }
                />
                <Button className="ui right floated" onClick={ this.saveAndContinue }>Save And Continue </Button>
              </Form>
              <div class="ui four steps">
                <div class="ui active step">
                  User Details
                </div>
                <div class="ui disabled step">
                  Class Details
                </div>
                <div class="ui disabled step">
                  Image
                </div>
                <div class="ui disabled step">
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