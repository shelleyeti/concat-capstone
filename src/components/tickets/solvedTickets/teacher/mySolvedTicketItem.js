import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import '../../../tickets/tickets.css';

export default class SolvedTicketList extends Component {
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

  render() {
    return (
      <Card centered fluid raised key={ this.props.item.id } >
        <div className="user-image-container">{ this.getUserImage() }</div>
        <Card.Content>
          <Card.Header>{ this.props.item.ticketTitle }</Card.Header>
          <Card.Description>{ this.props.item.ticketBody }</Card.Description>
          <Card.Description>Solution Notes: { this.props.item.solutionNotes }</Card.Description>
          <Card.Meta>{ this.props.item.submitTime }</Card.Meta>
        </Card.Content>
      </Card>
    )
  }
}