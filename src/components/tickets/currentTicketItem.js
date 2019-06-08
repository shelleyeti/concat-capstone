import React, { Component } from 'react';
import { Button, Card, Image, Form, TextArea } from 'semantic-ui-react';
import Tickets from '../../modules/ticketManager'

export default class CurrentTicketItem extends Component {

  state = {
    userId: '',
    classId: '',
    ticketComplete: '',
    ticketTitle: '',
    ticketBody: '',
    submitTime: '',
    linked: '',
    solutionNotes: ''
  };

  handleComplete = () => {
    this.props.editTicket({
      userId: this.props.item.userId,
      classId: this.props.item.classId,
      ticketComplete: true,
      ticketTitle: this.props.item.ticketTitle,
      ticketBody: this.props.item.ticketBody,
      submitTime: this.props.item.submitTime,
      linked: this.props.item.linked,
      solutionNotes: this.state.solutionNotes,
      id: this.props.item.id
    })
  };

  handleReassign = () => {
    this.props.editTicket({
      userId: this.props.item.userId,
      classId: this.props.item.classId,
      ticketComplete: false,
      ticketTitle: this.props.item.ticketTitle,
      ticketBody: this.props.item.ticketBody,
      submitTime: this.props.item.submitTime,
      linked: this.props.item.linked,
      solutionNotes: this.state.solutionNotes,
      id: this.props.item.id
    })
  };

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
              <TextArea
                label='Solution Notes'
                placeholder='Solution Notes'
                value={ this.props.item.solutionNotes }
                onChange={ (e) => this.setState({ solutionNotes: e.target.value }) }
              />
            </Form>
            <Button className="btn-margin" onClick={ this.handleReassign } >Reassign</Button>
            <Button className="btn-margin" onClick={ this.handleComplete } >Complete</Button>
          </Card.Content>
        </Card>
      </div>
    )
  }
}