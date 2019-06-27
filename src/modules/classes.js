import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

export default {
  getClass(classId) {
    return firebase.database().ref('/classes/' + classId).once('value').then(function (snapshot) {
      return snapshot.val();
    });
  },

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
    let updates = {};
    updates["/classes/" + editedClass.id] = editedClass;
    return firebase.database().ref().update(updates).then(() => {
      return this.getClass(editedClass.id);
    });
  }
}