import React, { Component } from 'react';
import { Button, Card, Image, Form, TextArea } from 'semantic-ui-react';

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
    this.props.removeTeacherTicket(this.props.item.teacherTicketJoinId)
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

  getUserImage = () => {
    let images;
    if (typeof (this.props.image) === "object") {
      images = this.props.image.map((image, index) => {
        return (<div className="user-image-inline" key={ index }><Image className="avatar" key={ index } src={ image } /></div>)
      });
    } else {
      images = <Image className="avatar" src={ this.props.image } />
    }

    return images;
  };


  render() {
    return (
      <div>
        <Card centered fluid raised key={ this.props.item.id } >
          <div className="user-image-container">{ this.getUserImage() }</div>
          <Card.Content>
            <Card.Header>{ this.props.item.ticketTitle }</Card.Header>
            <Card.Description>{ this.props.item.ticketBody }</Card.Description>
            <Card.Meta>{ this.props.item.submitTime }</Card.Meta>
            <Form>
              <TextArea
                label='Solution Notes'
                placeholder='Solution Notes'
                defaultValue={ this.props.item.solutionNotes }
                onChange={ (e) => this.setState({ solutionNotes: e.target.value }) }
              />
            </Form>
            <Button className="rose" onClick={ this.handleReassign } >Reassign</Button>
            <Button className="trolley" onClick={ this.handleComplete } >Complete</Button>
          </Card.Content>
        </Card>
      </div>
    )
  }
}