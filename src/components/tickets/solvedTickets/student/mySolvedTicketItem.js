import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import '../../../tickets/tickets.css';

export default class SolvedTicketList extends Component {

  render() {
    return (
      <Card className="ticket-height" centered fluid raised key={ this.props.item.id } >
        <Image avatar floated='left' size='mini' src={ this.props.image } />
        <Card.Content>
          <Card.Header>{ this.props.item.ticketTitle }</Card.Header>
          <Card.Description>{ this.props.item.ticketBody }</Card.Description>
          <Card.Description>Solution Notes: { this.props.item.solutionNotes }</Card.Description>
          <Card.Meta>{ this.props.item.submitTime }</Card.Meta>
        </Card.Content>
      </Card>
    )
  }
}