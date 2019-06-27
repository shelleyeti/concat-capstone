import React, { Component } from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';

export default class NotifyModal extends Component {
  state = {
    active: this.props.openModal,
    ticketTitle: this.props.editTicketItem.ticketTitle,
    id: this.props.editTicketItem.id
  }

  onCloseModal = () => {
    this.props.handleNotifyModal(false);
  }

  render() {
    return (
      <div>
        <Modal size='tiny' basic open={ this.props.openNotify } onClose={ this.onCloseModal } >
          <Icon name="close" onClick={ this.onCloseModal } />
          <Modal.Header>You're Up!</Modal.Header>
          <Modal.Content>
            {/* <Image circular className="ui small image ticket-edit-image" src={ this.props.editTicketItem.image } /> */ }
            {/* <p>Please see { teacher } for help with { ticketTitle }</p> */ }
          </Modal.Content>
          <Modal.Actions>
            <Button floated='right' onClick={ this.onCloseModal }>Got It</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}