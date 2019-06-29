import React, { Component } from 'react';
import { Modal, Button, Icon, Image, Item } from 'semantic-ui-react';

export default class NotifyModal extends Component {
  state = {
    active: this.props.openModal,
  }

  onCloseModal = () => {
    this.props.handleNotifyModal(false);
  }

  render() {
    let teacher = {};
    if (this.props.notifyTicketItem !== null && this.props.notifyTicketItem !== undefined) {
      this.props.allTeacherTickets.forEach((join) => {
        if (join.ticketId === this.props.notifyTicketItem.id) {
          this.props.allUsers.forEach((user) => {
            if (user.id === join.userId) {
              teacher = user;
            }
          })
        }
      })
    }
    return (
      <div>
        <Modal size='tiny' basic open={ this.props.openNotify } onClose={ this.onCloseModal } >
          <Icon name="close" onClick={ this.onCloseModal } />
          <Modal.Header>You're Up!</Modal.Header>
          <Modal.Content>
            <Image circular className="ui small image ticket-edit-image" src={ teacher.image } />
            <p>Please see { teacher.name } for help with { this.props.notifyTicketItem !== null && this.props.notifyTicketItem !== undefined ? this.props.notifyTicketItem.ticketTitle : "" }</p>
          </Modal.Content>
          <Modal.Actions>
            <Button floated='right' onClick={ this.onCloseModal }>Got It</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}