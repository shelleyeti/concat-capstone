import React, { Component } from 'react';
import { Form, Button, Container, Grid, Segment, Header, Dropdown, Card } from 'semantic-ui-react';
import './register.css'

export default class StepTwoClassDetails extends Component {
  state = {
    student: this.props.state.student,
    classId: this.props.state.classId,
    cohortName: this.props.state.cohortName
  }

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
    const classes = this.props.allClasses.map((cohort, index) => {
      return { key: index, text: cohort.cohortName, value: cohort.id };

    })
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
                  defaultValue={ values.blurb }
                />
                <Card className="horizontal segments">
                  <div className="ui segment">
                    <Form.Radio
                      className="radioOne"
                      label='Student'
                      checked={ this.state.student === true }
                      onChange={ (e, { value }) => {
                        this.setState({ student: true })
                        this.props.handleChangeStudent(true)
                      } }
                    />
                    <Form.Radio
                      className="radioTwo"
                      label='Teacher'
                      checked={ this.state.student === false }
                      onChange={ (e, { value }) => {
                        this.setState({ student: false })
                        this.props.handleChangeStudent(false)
                      } }
                    />
                  </div>
                  <div className="ui segment dropdownOne">
                    <Form.Field>
                      <Dropdown onChange={ (event, data) => {
                        this.setState({
                          classId: data.value,
                          cohortName: event.currentTarget.textContent
                        })
                        this.props.handleChangeClasses(event.currentTarget.textContent, data.value)
                      } }
                        value={ this.state.classId }
                        options={ classes } closeOnChange fluid search item selection upward={ false } placeholder='Select a Class'>
                      </Dropdown>
                    </Form.Field>
                  </div>
                </Card>
                <Button className="ui left floated trolley" onClick={ this.back }>Back</Button>
                <Button className="ui right floated trolley" onClick={ this.saveAndContinue }>Save and Continue </Button>
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