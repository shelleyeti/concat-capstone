import React, { Component } from 'react';
import { Form, Button, Container, Grid, Segment, Header } from 'semantic-ui-react';

export default class StepOneUserDetails extends Component {
  state = {
    image: this.props.state.image
  }

  saveAndContinue = (e) => {
    e.preventDefault()
    this.props.nextStep()
  }

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  }
  render() {

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

                  onChange={ (e) => {
                    this.setState({ image: e.target.files[0] });
                    this.props.handleChange(e.target.files[0]);
                  } }
                  placeholder="Photo" />
                <Button className="ui left floated trolley" onClick={ this.back }>Back</Button>
                <Button className="ui right floated trolley" onClick={ this.saveAndContinue }>Save and Continue </Button>
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