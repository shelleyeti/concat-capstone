import * as firebase from 'firebase';
import 'firebase/auth';
const remoteURL = "http://localhost:8088"


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
  }
}
