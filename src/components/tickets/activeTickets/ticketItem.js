import React, { Component } from 'react';
import { Card, Image, Button, Form, TextArea } from 'semantic-ui-react';
import '../../tickets/tickets.css';

export default class TicketList extends Component {

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

  handleAssign = () => {
    this.props.addTeacherTicket({
      ticketId: this.props.item.id,
      userId: this.props.activeUser.id,
    })
  };

  handleAddToTicket = () => {
    // this.props.addTeacherTicket({
    //   ticketId: this.props.item.id,
    //   userId: this.props.activeUser.id,
    // })
  };

  handleEditTicket = () => {

  }

  handleStudentSolve = () => {
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

  handleMyTicketView = () => {
    if (this.props.item.userId === this.props.activeUser.id) {
      return (<>
        <Form>
          <TextArea
            label='Solution Notes'
            placeholder='Solution Notes'
            defaultValue={ this.props.item.solutionNotes }
            onChange={ (e) => this.setState({ solutionNotes: e.target.value }) }
          />
        </Form>
        <Button className="btn-margin" onClick={ this.handleEditTicket }>Edit</Button>
        <Button className="btn-margin" onClick={ this.handleStudentSolve }>Marked Solved</Button>
      </>)
    } else if (this.props.item.userId !== this.props.activeUser.id) {
      return (<Button className="btn-margin" onClick={ this.handleAddToTicket }>Join Ticket</Button>)
    }
  }

  handleTicketView = () => {
    //teacher ticket view
    if (this.props.activeUser !== null && this.props.activeUser.student === false) {
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
      //student ticket view
    } else if (this.props.activeUser !== null && this.props.activeUser.student) {
      return (
        <Card centered fluid key={ this.props.item.id } >
          <Image floated='left' size='mini' src={ this.props.image } />
          <Card.Content>
            <Card.Header>{ this.props.item.ticketTitle }</Card.Header>
            <Card.Description>{ this.props.item.ticketBody }</Card.Description>
            <Card.Meta>{ this.props.item.submitTime }</Card.Meta>
            { this.handleMyTicketView() }
          </Card.Content>
        </Card>
      )
    }

  }
  render() {
    return (
      <div>
        { this.handleTicketView() }
      </div>
    )
  }
}