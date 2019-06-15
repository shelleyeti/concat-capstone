import React, { Component } from 'react';
import { Modal, Button, Image, Icon } from 'semantic-ui-react';
export default class EditTicket extends Component {
  state = {
    active: this.props.openModal
  }

  onCloseModal = () => {
    this.props.handleOpenCloseModal(false);
  }

  render() {
    return (
      <div>
        <Modal className="tiny" open={ this.props.openModal } onClose={ this.onCloseModal } >
          <Icon name="close" onClick={ this.onCloseModal } />
          <Modal.Header>Edit Ticket</Modal.Header>
          <Modal.Content image>
            <Image size="small" wrapComponent src="" />
            <Modal.Description>
              <Modal.Header>Edit Ticket</Modal.Header>
              <p>We've found the following gravatar image associated with your e-mail address.</p>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button emphasis="negative" onClick={ this.onCloseModal }>Nope</Button>
            <Button emphasis="positive" onClick={ this.onCloseModal }>Yep, that's me</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}