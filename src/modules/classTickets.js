import * as firebase from 'firebase';
import 'firebase/auth';

export default {
  getClassTicket(joinedId) {
    return firebase.database().ref('/classTickets/' + joinedId).once('value').then(function (snapshot) {
      return snapshot.val();
    });
  },

  deleteClassTicket(id) {
    return firebase.database().ref("classTickets/" + id).remove();
  },

  saveClassTicket(obj) {
    let newClassTicketKey = firebase.database().ref().child('classTickets').push().key;
    obj.id = newClassTicketKey;
    let database = firebase.database();

    return database.ref('classTickets/' + newClassTicketKey).set(obj);
  },

  editClassTicket(editedClassTicket) {
    let updates = {};
    updates["/classTickets/" + editedClassTicket.id] = editedClassTicket;
    return firebase.database().ref().update(updates).then(() => {
      return this.getClassTicket(editedClassTicket.id);
    });
  }
}