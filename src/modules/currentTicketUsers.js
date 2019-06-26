import * as firebase from 'firebase';
import 'firebase/auth';
const remoteURL = "http://localhost:8088"

export default {
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
    return fetch(`${remoteURL}/currentTicketUsers/${editedCurrentTicketUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedCurrentTicketUser)
    }).then(data => data.json());
  }
}