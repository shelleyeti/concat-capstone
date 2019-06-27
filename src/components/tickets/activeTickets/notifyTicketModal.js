import React, { Component } from 'react';
import { Modal, Button, Icon, Image, Item } from 'semantic-ui-react';

export default class NotifyModal extends Component {
  state = {
    active: this.props.openModal,
  }

  onCloseModal = () => {
    this.props.handleNotifyModal(false);
  }

  // handleTeacher = () => {
  //   this.props.allTeacherTickets(() => {
  //     if (this.props.item.id === )
  //   })
  // }

  render() {
    return (
      <div>
        <Modal size='tiny' basic open={ this.props.openNotify } onClose={ this.onCloseModal } >
          <Icon name="close" onClick={ this.onCloseModal } />
          <Modal.Header>You're Up!</Modal.Header>
          <Modal.Content>
            <Image circular className="ui small image ticket-edit-image" src={ this.props.editTicketItem.image } />
            <p>Please see { this.teacher } for help with { this.props.ticketTitle }</p>
          </Modal.Content>
          <Modal.Actions>
            <Button floated='right' onClick={ this.onCloseModal }>Got It</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}