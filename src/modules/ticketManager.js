import * as firebase from 'firebase';
import 'firebase/auth';
const remoteURL = "http://localhost:8088"


export default {

  getTicket(id) {
    return fetch(`${remoteURL}/tickets/${id}`).then(e => e.json())
  },

  getAllTicketsReverse() {
    return fetch(`${remoteURL}/tickets?_sort=submitTime&_order=desc,asc`).then(e => e.json())
  },

  saveTicket(obj) {
    let newTicketKey = firebase.database().ref().child('tickets').push().key;
    obj.id = newTicketKey;
    let database = firebase.database();

    return database.ref('tickets/' + newTicketKey).set(obj);
  },

  editTicket(editedTicket) {
    return fetch(`${remoteURL}/tickets/${editedTicket.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedTicket)
    }).then(data => data.json());
  }
}
