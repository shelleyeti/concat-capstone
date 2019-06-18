import React, { Component } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';

export default class AllClassesList extends Component {

  // handleAssign = () => {
  //   this.props.addTeacherTicket({
  //     ticketId: this.props.item.id,
  //     userId: this.props.activeUser.id,
  //   })
  // };

  render() {
    return (
      <Card centered fluid raised key={ this.props.item.id } >
        <Image avatar floated='left' size='mini' src={ this.props.image } />
        <Card.Content>
          <Card.Header>{ this.props.item.ticketTitle }</Card.Header>
          <Card.Description>{ this.props.item.ticketBody }</Card.Description>
          <Card.Meta>{ this.props.item.submitTime }</Card.Meta>
          <Button onClick={ this.handleAssign }>Assign</Button>
        </Card.Content>
      </Card>
    )
  }
}