import React, { Component } from 'react';
import { Button, Card, Image, Form, TextArea } from 'semantic-ui-react';

export default class CurrentTicketItem extends Component {

  // state = {
  //   userId: '',
  //   classId: '',
  //   ticketComplete: '',
  //   ticketTitle: '',
  //   ticketBody: '',
  //   submitTime: '',
  //   linked: '',
  //   solutionNotes: ''
  // };

  render() {
    return (
      <div>
        <Card centered fluid key={ this.props.item.id } >
          <Image floated='left' size='mini' src={ this.props.item.userId } />
          <Card.Content>
            <Card.Header>{ this.props.item.ticketTitle }</Card.Header>
            <Card.Description>{ this.props.item.ticketBody }</Card.Description>
            <Card.Meta>{ this.props.item.submitTime }</Card.Meta>
            <Form>
              <TextArea label='Solution Notes' placeholder='Solution Notes' />
            </Form>
            <Button>Complete</Button>
          </Card.Content>
        </Card>
      </div>
    )
  }
}