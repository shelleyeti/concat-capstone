import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

export default {
  getCurrentTicketUser(joinedId) {
    return firebase.database().ref('/currentTicketUsers/' + joinedId).once('value').then(function (snapshot) {
      return snapshot.val();
    });
  },

  deleteCurrentTicketUser(id) {
    return firebase.database().ref("currentTicketUsers/" + id).remove();
  },

  saveCurrentTicketUser(obj) {
    let newCurrentTicketUserKey = firebase.database().ref().child('currentTicketUsers').push().key;
    obj.id = newCurrentTicketUserKey;
    let database = firebase.database();

    return database.ref('currentTicketUsers/' + newCurrentTicketUserKey).set(obj);
  },

  editCurrentTicketUser(editedCurrentTicketUser) {
    let updates = {};
    updates["/currentTicketUsers/" + editedCurrentTicketUser.id] = editedCurrentTicketUser;
    return firebase.database().ref().update(updates).then(() => {
      return this.getCurrentTicketUser(editedCurrentTicketUser.id);
    });
  }
}