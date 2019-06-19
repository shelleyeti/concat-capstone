import React, { Component } from 'react';
import { Card, Image, Button, Form, TextArea } from 'semantic-ui-react';
import moment from 'moment';
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

  subTimeInterval = {};

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
  };

  handleRemoveJoinTicket = () => {
    this.props.deleteJoin(this.props.joinedTicketId)
  };

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

  getUserImage = () => {
    let images;
    if (typeof (this.props.image) === "object") {
      images = this.props.image.map((image, index) => {
        return (<div className="user-image-inline" key={ index }><Image className="circular tiny" key={ index } src={ image } /></div>)
      });
    } else {
      images = <Image className="circular tiny" src={ this.props.image } />
    }

    return images;
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

    } if (!this.props.showRemoveJoin) {
      return (<Button className="laurel" onClick={ this.handleJoinTicket }>Join Ticket</Button>)
    }
    else if (this.props.showRemoveJoin) {
      return (<Button onClick={ this.handleRemoveJoinTicket }>Remove Join</Button>)
    }
  };

  handleCardLength = () => {
    let parsedDate = moment(this.props.item.submitTime, 'MMMM Do YYYY, h:mm:ss a');
    let time = moment().diff(parsedDate, 'minutes');
    if (time > 30) {
      clearImmediate(this.subTimeInterval);
      return "rose"
    }
    if (time > 20) return "straw"
    if (time > 10) return "steel"
  }

  handleTicketView = () => {
    //teacher ticket view
    if (this.props.activeUser !== null && this.props.activeUser.student === false) {

      return (
        <Card centered fluid raised key={ this.props.item.id } className={ this.handleCardLength() }>
          <Image circular floated='left' size='tiny' src={ this.props.image } />
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
      } else if (this.props.hasMultipleJoins !== null && this.props.hasMultipleJoins) {
        cardColor = "laurel";
      }

      return (
        <Card centered fluid raised key={ this.props.item.id } className={ cardColor }>
          <div className="user-image-container">{ this.getUserImage() }</div>
          <Card.Content>
            <Card.Header>{ this.props.item.ticketTitle }</Card.Header>
            <Card.Description>{ this.props.item.ticketBody }</Card.Description>
            <Card.Meta>{ this.props.item.submitTime }</Card.Meta>
            { this.handleMyTicketView() }
          </Card.Content>
        </Card>
      )
    }
  };

  checkSubTime = () => {
    this.subTimeInterval = setInterval(() => {
      this.forceUpdate();
    }, 30000)
  }

  render() {
    this.checkSubTime();
    return (
      <div>
        { this.handleTicketView() }
      </div>
    )
  }
}