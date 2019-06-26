import * as firebase from 'firebase';
import 'firebase/auth';
const remoteURL = "http://localhost:8088"

export default {
  getCurrentTicketUser(id) {
    return fetch(`${remoteURL}/currentTicketUsers/${id}`).then(e => e.json())
  },

  getAllCurrentTicketUsers() {
    return fetch(`${remoteURL}/currentTicketUsers`).then(e => e.json())
  },

  deleteCurrentTicketUser(id) {
    return fetch(`${remoteURL}/currentTicketUsers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(e => e.json())
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