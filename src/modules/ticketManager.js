import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

export default {
  getTicket(ticketId) {
    return firebase.database().ref('/tickets/' + ticketId).once('value').then(function (snapshot) {
      return snapshot.val();
    });
  },

  saveTicket(obj) {
    let newTicketKey = firebase.database().ref().child('tickets').push().key;
    obj.id = newTicketKey;
    let database = firebase.database();

    return database.ref('tickets/' + newTicketKey).set(obj);
  },

  editTicket(editedTicket) {
    let updates = {};
    updates["/tickets/" + editedTicket.id] = editedTicket;
    return firebase.database().ref().update(updates).then(() => {
      return this.getTicket(editedTicket.id);
    });
  },

  search(inputValue) {
    return firebase.database().ref('/tickets/').once('value').then(function (snapshot) {
      let tickets = snapshot;
      let ticketArr = [];
      let allTickets = tickets.val();
      for (let ticket in allTickets) {
        ticketArr.push(allTickets[ticket]);
      }

      return ticketArr.filter((ticket) => {
        if (ticket === null || ticket === undefined)
          return null;

        if (ticket.ticketBody.toUpperCase().indexOf(inputValue.toUpperCase()) > -1 || ticket.ticketTitle.toUpperCase().indexOf(inputValue.toUpperCase()) > -1 ||
          (ticket.hasOwnProperty("solutionNotes") && ticket.solutionNotes.toUpperCase().indexOf(inputValue.toUpperCase()) > -1)) {
          return ticket;
        }

        return null;
      })
    });
  }
}
