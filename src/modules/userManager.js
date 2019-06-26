import * as firebase from 'firebase';
import 'firebase/auth';
const remoteURL = "http://localhost:8088"

export default {
  getUser(id) {
    return fetch(`${remoteURL}/users/${id}`).then(e => e.json())
  },

  getAllUsers() {
    return fetch(`${remoteURL}/users`).then(e => e.json())
  },

  deleteUser(id) {
    return fetch(`${remoteURL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(e => e.json())
  },

  saveUser(obj) {
    let newUserKey = firebase.database().ref().child('users').push().key;
    obj.id = newUserKey;
    let database = firebase.database();

    return database.ref('users/' + newUserKey).set(obj);
  },


  editUser(editedUser) {
    return fetch(`${remoteURL}/users/${editedUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedUser)
    }).then(data => data.json());
  }
}