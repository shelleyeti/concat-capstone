import * as firebase from 'firebase';
import 'firebase/auth';
const remoteURL = "http://localhost:8088"

export default {
  getClassTicket(id) {
    return fetch(`${remoteURL}/classTickets/${id}`).then(e => e.json())
  },

  getAllClassTickets() {
    return fetch(`${remoteURL}/classTickets`).then(e => e.json())
  },

  deleteClassTicket(id) {
    return fetch(`${remoteURL}/classTickets/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(e => e.json())
  },

  saveClassTicket(obj) {
    let newClassTicketKey = firebase.database().ref().child('classTickets').push().key;
    obj.id = newClassTicketKey;
    let database = firebase.database();

    return database.ref('classTickets/' + newClassTicketKey).set(obj);
  },

  editClassTicket(editedClassTicket) {
    return fetch(`${remoteURL}/classTickets/${editedClassTicket.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedClassTicket)
    }).then(data => data.json());
  }
}