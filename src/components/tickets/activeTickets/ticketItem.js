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

  handleJoinTicket = () => {
    this.props.addJoin({
      userId: this.props.activeUser.id,
      ticketId: this.props.item.id
    })
    // this.handleCardColor();
  };

  handleButtonColor = () => {

  }

  handleCardColor = () => {
    if (this.props.item.userId === this.props.activeUser.id) {
      return "straw"
    }
  }

  handleEdit = () => {
    this.props.handleOpenModal(true);
    this.props.editTicketState({
      image: this.props.image,
      userId: this.props.item.userId,
      classId: this.props.item.classId,
      ticketComplete: false,
      ticketTitle: this.props.item.ticketTitle,
      ticketBody: this.props.item.ticketBody,
      submitTime: this.props.item.submitTime,
      linked: this.props.item.linked,
      solutionNotes: this.props.item.solutionNotes,
      id: this.props.item.id
    })
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
        <Button className="steel" onClick={ this.handleEdit }>Edit</Button>
        <Button className="trolley" onClick={ this.handleStudentSolve }>Marked Solved</Button>
      </>)
    } else if (this.props.item.userId !== this.props.activeUser.id) {
      return (<Button className="laurel" onClick={ this.handleJoinTicket }>Join Ticket</Button>)
    }
  }

  handleTicketView = () => {
    //teacher ticket view
    if (this.props.activeUser !== null && this.props.activeUser.student === false) {
      return (
        <Card centered fluid raised key={ this.props.item.id } className="">
          <Image floated='left' size='mini' src={ this.props.image } />
          <Card.Content>
            <Card.Header>{ this.props.item.ticketTitle }</Card.Header>
            <Card.Description>{ this.props.item.ticketBody }</Card.Description>
            <Card.Meta>{ this.props.item.submitTime }</Card.Meta>
            <Button className="trolley" onClick={ this.handleAssign }>Assign</Button>
          </Card.Content>
        </Card>
      )
      //student ticket view
    } else if (this.props.activeUser !== null && this.props.activeUser.student) {

      let cardColor = "";
      if (this.props.item.userId === this.props.activeUser.id) {
        cardColor = "steel";
        // } else if (joined ticket is true) {
        //   cardColor = "laurel";
      }
      return (
        <Card centered fluid raised key={ this.props.item.id } className={ cardColor }>
          { this.getUserImage() }
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

  getUserImage = () => {
    let images;
    if (typeof (this.props.image) === "object") {
      images = this.props.image.map((image) => {
        return (<Image className="inline-image" floated='left' size='mini' src={ image } />)
      });
    } else {
      images = <Image floated='left' size='mini' src={ this.props.image } />
    }

    return images;
  }

  render() {
    return (
      <div>
        { this.handleTicketView() }
      </div>
    )
  }
}