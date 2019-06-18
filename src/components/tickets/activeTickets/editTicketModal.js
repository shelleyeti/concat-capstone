import React, { Component } from 'react';
import { Modal, Button, Image, Icon, Input, Form, TextArea } from 'semantic-ui-react';

export default class EditTicket extends Component {
  state = {
    active: this.props.openModal,
    userId: this.props.editTicketItem.userId,
    classId: this.props.editTicketItem.classId,
    ticketComplete: false,
    ticketTitle: this.props.editTicketItem.ticketTitle,
    ticketBody: this.props.editTicketItem.ticketBody,
    submitTime: this.props.editTicketItem.submitTime,
    linked: this.props.editTicketItem.linked,
    solutionNotes: this.props.editTicketItem.solutionNotes,
    id: this.props.editTicketItem.id
  }

  onCloseModal = () => {
    this.props.handleOpenCloseModal(false);
  }

  handleEdit = () => {
    this.props.editTicket({
      ticketTitle: this.state.ticketTitle,
      ticketBody: this.state.ticketBody,
      id: this.props.editTicketItem.id
    })
    this.onCloseModal()
  }

  render() {
    return (
      <div>
        <Modal className="tiny" open={ this.props.openModal } onClose={ this.onCloseModal } >
          <Icon name="close" onClick={ this.onCloseModal } />
          <Modal.Header>Edit Ticket</Modal.Header>
          <Modal.Content>
            <Image avatar className="ui small image ticket-edit-image" src={ this.props.editTicketItem.image } />
            <Modal.Description className="ticket-edit-fields">
              <label>Ticket Title: </label>
              <Input
                type="text"
                className="fluid"
                onChange={ (e) => this.setState({ ticketTitle: e.target.value }) }
                defaultValue={ this.props.editTicketItem.ticketTitle } />
              <label>Ticket Body: </label>
              <Form>
                <TextArea
                  className="fluid"
                  onChange={ (e) => this.setState({ ticketBody: e.target.value }) }
                  defaultValue={ this.props.editTicketItem.ticketBody } />
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button className="rose" onClick={ this.onCloseModal }>Cancel</Button>
            <Button className="laurel" onClick={ this.handleEdit }>Save</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}