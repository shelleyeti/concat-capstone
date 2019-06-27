import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

export default {
  getJoinedTicket(joinedId) {
    return firebase.database().ref('/joinedTickets/' + joinedId).once('value').then(function (snapshot) {
      return snapshot.val();
    });
  },

  deleteJoinedTicket(id) {
    return firebase.database().ref("joinedTickets/" + id).remove();
  },

  saveJoinedTicket(obj) {
    let newJoinedTicketKey = firebase.database().ref().child('joinedTickets').push().key;
    obj.id = newJoinedTicketKey;
    let database = firebase.database();

    return database.ref('joinedTickets/' + newJoinedTicketKey).set(obj);
  },

  editJoinedTicket(editedJoinedTicket) {
    let updates = {};
    updates["/joinedTickets/" + editedJoinedTicket.id] = editedJoinedTicket;
    return firebase.database().ref().update(updates).then(() => {
      return this.getJoinedTicket(editedJoinedTicket.id);
    });
  }
}