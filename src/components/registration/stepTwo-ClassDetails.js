import React, { Component } from 'react';
import { Form, Button, Container, Grid, Segment, Header, Dropdown } from 'semantic-ui-react';
import './register.css'

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
                  type="text"
                  label="Username"
                  placeholder="Enter a username"
                  onChange={ this.props.handleChange('username') }
                  defaultValue={ values.username }
                />
                <Form.Field
                  control="input"
                  type="text"
                  label="Blurb"
                  placeholder="Enter a short blurb about yourself"
                  onChange={ this.props.handleChange('blurb') }
                />
                <Segment className="horizontal segments">
                  <div className="ui segment">
                    <Form.Radio
                      className="radioOne"
                      label='Student'
                      // checked={ this.state.student === true }
                      // onChange={ this.props.handleChange('student') }
                      onChange={ (e, { value }) => {
                        this.setState({ student: true })
                      } }
                    />
                    <Form.Radio
                      className="radioTwo"
                      label='Teacher'
                      // checked={ this.state.student === false }
                      // onChange={ this.props.handleChange('student') }
                      onChange={ (e, { value }) => {
                        this.setState({ student: false })
                      } }
                    />
                  </div>
                  <div className="ui segment">
                    <Form.Field className="dropdownOne ui segment">
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
                  </div>
                </Segment>
                <Button className="ui left floated" onClick={ this.back }>Back</Button>
                <Button className="ui right floated" onClick={ this.saveAndContinue }>Save And Continue </Button>
              </Form>
              <div className="ui four steps">
                <div className="ui disabled step">
                  User Details
                </div>
                <div className="ui active step">
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
      </Container >
    )
  }
}