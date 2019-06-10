import React, { Component } from 'react';
import { Card, Image, Input } from 'semantic-ui-react';
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
              <Input type="text" id="user-image" defaultValue={ this.props.activeUser.image } />
            </Card.Description>
          </Card.Content>
        </Card>
      )
    } else {
      //edit mode false
      return (
        <Card centered fluid className="card-dash">
          <Image centered floated='left' size='medium' src={ this.props.activeUser.image } alt="user profile" className="user-image" />
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