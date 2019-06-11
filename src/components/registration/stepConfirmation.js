import React, { Component } from 'react';
import { Button, List } from 'semantic-ui-react';
// import './dashboard.css';

export default class StepConfirmation extends Component {
  saveAndContinue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  }

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  }

  render() {
    const { values: { firstName, lastName, email, age, city, country } } = this.props;

    return (
      <div>
        <h1 className="ui centered">Confirm your Details</h1>
        <p>Click Confirm if the following details have been correctly entered</p>
        <List>
          <List.Item>
            <List.Icon name='users' />
            <List.Content>First Name: { firstName }</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='users' />
            <List.Content>Last Name: { lastName }</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='mail' />
            <List.Content>
              <a href='mailto:jack@semantic-ui.com'>{ email }</a>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='calendar' />
            <List.Content>{ age } Years</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='marker' />
            <List.Content>{ city }, { country }</List.Content>
          </List.Item>
        </List>

        <Button className="ui left floated" onClick={ this.back }>Back</Button>
        <Button className="ui right floated" onClick={ this.saveAndContinue }>Confirm</Button>
      </div>
    )
  }
}