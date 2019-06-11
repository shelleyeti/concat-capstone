import React, { Component } from 'react';
import { Form, Button, Container, Grid, Segment, Header, Dropdown } from 'semantic-ui-react';

export default class StepTwoClassDetails extends Component {
  saveAndContinue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  }

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  }

  render() {
    const { values } = this.props
    return (
      <Container className="auth-container ui grid container">
        <Grid.Row centered>
          <Grid.Column className="six wide">
            <Segment>
              <Header as="h1" textAlign="center">
                Class Details
              </Header>
              <Form className="register-form">

                <Form.Field
                  control="input"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  onChange={ this.props.handleChange('password') }
                />
                <Form.Field
                  control="input"
                  type="text"
                  label="Blurb"
                  placeholder="Enter a short blurb about yourself"
                  onChange={ this.props.handleChange('blurb') }
                />
                <Form.Radio
                  label='Student'
                  // checked={ this.state.student === true }
                  // onChange={ this.props.handleChange('student') }
                  onChange={ (e, { value }) => {
                    this.setState({ student: true })
                  } }
                />
                <Form.Radio
                  label='Teacher'
                  // checked={ this.state.student === false }
                  // onChange={ this.props.handleChange('student') }
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

                <Button className="ui left floated" onClick={ this.back }>Back</Button>
                <Button className="ui right floated" onClick={ this.saveAndContinue }>Save And Continue </Button>
              </Form>
              <div class="ui four steps">
                <div class="ui disabled step">
                  User Details
                </div>
                <div class="ui active step">
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
      </Container >
    )
  }
}