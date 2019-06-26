import * as firebase from 'firebase';
import 'firebase/auth'; w
const remoteURL = "http://localhost:8088"

export default {
  getJoinedTicket(id) {
    return fetch(`${remoteURL}/joinedTickets/${id}`).then(e => e.json())
  },

  getAllJoinedTickets() {
    return fetch(`${remoteURL}/joinedTickets`).then(e => e.json())
  },

  deleteJoinedTicket(id) {
    return fetch(`${remoteURL}/joinedTickets/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(e => e.json())
  },

  saveJoinedTicket(obj) {
    let newJoinedTicketKey = firebase.database().ref().child('joinedTickets').push().key;
    obj.id = newJoinedTicketKey;
    let database = firebase.database();

    return database.ref('joinedTickets/' + newJoinedTicketKey).set(obj);
  },

  editJoinedTicket(editedJoinedTicket) {
    return fetch(`${remoteURL}/joinedTickets/${editedJoinedTicket.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedJoinedTicket)
    }).then(data => data.json());
  }
}