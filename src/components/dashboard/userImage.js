import React, { Component } from 'react';
import { Card, Image, Form } from 'semantic-ui-react';
import './dashboard.css';

export default class UserImage extends Component {
  state = {
    image: ""
  }

  displayConditions = () => {
    if (this.props.editMode) {
      //edit mode true
      return (
        <Card centered fluid className="card-dash">
          <Card.Content>
            <Card.Description>
              <Form.Field
                className="choose-upload-button"
                control="input"
                type="file"
                label="Photo"
                //files don't use .value and come through as an array
                onChange={ (e) => this.setState({ image: e.target.files[0] }) }
                placeholder="Photo" />
              <Form.Field control="input" type="hidden" />
            </Card.Description>
          </Card.Content>
        </Card>
      )
    } else {
      //edit mode false
      return (
        <Card centered fluid className="card-dash">
          <Image centered size='small' src={ this.props.activeUser.image } alt="user profile" className="user-image" />
        </Card>
      )
    }
  }

  render() {
    return (
      <div>
        { this.displayConditions() }
      </div>
    );
  }
}