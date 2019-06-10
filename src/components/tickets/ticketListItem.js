import React, { Component } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import './tickets.css';

export default class TicketList extends Component {

  handleAssign = () => {
    this.props.addTeacherTicket({
      ticketId: this.props.item.id,
      userId: this.props.activeUser.id,
    })
  };

  render() {
    return (
      <Card centered fluid key={ this.props.item.id } >
        <Image floated='left' size='mini' src={ this.props.image } />
        <Card.Content>
          <Card.Header>{ this.props.item.ticketTitle }</Card.Header>
          <Card.Description>{ this.props.item.ticketBody }</Card.Description>
          <Card.Meta>{ this.props.item.submitTime }</Card.Meta>
          <Button className="btn-margin" onClick={ this.handleAssign }>Assign</Button>
        </Card.Content>
      </Card>
    )
  }
}