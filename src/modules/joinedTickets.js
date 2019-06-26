import * as firebase from 'firebase';
import 'firebase/auth';
const remoteURL = "http://localhost:8088"

export default {
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
    return fetch(`${remoteURL}/joinedTickets/${editedJoinedTicket.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedJoinedTicket)
    }).then(data => data.json());
  }
}