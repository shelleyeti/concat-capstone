import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import AllSolvedTicketListStudent from '../tickets/solvedTickets/student/allSolvedTicketsItem';
import './search.css';

export default class SearchResults extends Component {
  render() {

    let openTicket = this.props.searchResults.filter((ticket) => {
      if (ticket.ticketComplete)
        return ticket;
    });

    let classTickets = openTicket.map((item, index) => {
      let images = [];

      //keeps the creator of the ticket first in image render
      this.props.allUsers.forEach((user) => {
        if (item.userId === user.id) {
          images.push(user.image);
        }
      });

      this.props.allUsers.forEach((user) => {
        this.props.joinedTickets.forEach((join) => {
          if (item.id === join.ticketId && join.userId === user.id) {
            images.push(user.image);
          }
        });
      })

      return (
        <>
          <AllSolvedTicketListStudent
            { ...this.props }
            key={ index }
            item={ item }
            index={ index }
            image={ images }
            extraClass="search-result-item"
          />
          <div className="search-result-spacer"></div>
        </>
      );
    });

    return (
      <Container className="searchResults">
        <h1>Search Results</h1>
        <Container className="ui four cards search-results"> { classTickets } </Container>
      </Container>
    );
  }
}