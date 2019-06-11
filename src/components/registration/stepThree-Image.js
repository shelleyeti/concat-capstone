import React, { Component } from 'react';
import { Form, Button, Container, Grid, Segment, Header } from 'semantic-ui-react';

export default class StepOneUserDetails extends Component {
  saveAndContinue = (e) => {
    e.preventDefault()
    this.props.nextStep()
  }

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  }

  render() {
    const { values } = this.props;

    return (
      <Container className="auth-container ui grid container">
        <Grid.Row centered>
          <Grid.Column className="six wide">
            <Segment>
              <Header as="h1" textAlign="center">
                Upload an Image
              </Header>

              <Form className="register-form">
                <Form.Field
                  className="choose-upload-button"
                  control="input"
                  type="file"
                  label="Photo"
                  //files don't use .value and come through as an array
                  onChange={ (e) => this.setState({ image: e.target.files[0] }) }
                  placeholder="Photo" />
                <Button className="ui left floated" onClick={ this.back }>Back</Button>
                <Button className="ui right floated" onClick={ this.saveAndContinue }>Save And Continue </Button>
              </Form>
              <div className="ui four steps">
                <div className="ui disabled step">
                  User Details
                </div>
                <div className="ui disabled step">
                  Class Details
                </div>
                <div className="ui active step">
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