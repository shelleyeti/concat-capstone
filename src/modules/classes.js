import * as firebase from 'firebase';
import 'firebase/auth';
const remoteURL = "http://localhost:8088"

export default {
  deleteClass(id) {
    return firebase.database().ref("classes/" + id).remove();
  },

  saveClass(obj) {
    let newClassKey = firebase.database().ref().child('classes').push().key;
    obj.id = newClassKey;
    let database = firebase.database();

    return database.ref('classes/' + newClassKey).set(obj);
  },

  editClass(editedClass) {
    return fetch(`${remoteURL}/classes/${editedClass.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedClass)
    }).then(data => data.json());
  }
}