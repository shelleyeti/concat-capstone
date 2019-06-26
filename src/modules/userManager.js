import * as firebase from 'firebase';
import 'firebase/auth';

export default {
  getUser(userId) {
    return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
      return snapshot.val();
    });
  },

  deleteUser(id) {
    return firebase.database().ref("users/" + id).remove();
  },

  saveUser(obj) {
    let newUserKey = firebase.database().ref().child('users').push().key;
    obj.id = newUserKey;
    let database = firebase.database();

    return database.ref('users/' + newUserKey).set(obj)
      .then((snapShot) => {
        return this.getUser(newUserKey);
      });
  },

  editUser(editedUser) {
    let updates = {};
    updates["/users/" + editedUser.id] = editedUser;
    return firebase.database().ref().update(updates).then(() => {
      return this.getUser(editedUser.id);
    });
  }
}