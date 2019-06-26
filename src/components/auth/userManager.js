import * as firebase from 'firebase/app';
import 'firebase/auth';
import saveUserToFirebase from '../../modules/userManager'

const setUserInLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
}

//username email and password
export const register = (user) => {
  return registerWithFirebase(user.email, user.password)
    .then(firebaseId => {
      user.password = null;
      user.id = firebaseId;
      return saveUserToFirebase.saveUser(user)
    })
    .then(newUserFromFirebase => {
      setUserInLocalStorage(newUserFromFirebase);
      return newUserFromFirebase;
    })
    .catch(function (error) {
      alert(`Yikes`)
      console.log(error)
    })
}

export const login = (email, password) => {
  return loginWithFirebase(email, password)
    .then(firebaseId => {
      return getUser(firebaseId)
    })
    .then(userFromFirebase => {
      setUserInLocalStorage(userFromFirebase);
      return userFromFirebase
    })
    .catch(() => {
      alert(`No LoG iN`)
    });
}

export const getUser = (userId) => {
  return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
    return snapshot.val();
  });
}

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');

  if (!user) return null;

  return JSON.parse(user);
}

export const logout = () => {
  localStorage.removeItem('user');
}

export const registerWithFirebase = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(data => {
      return data.user.uid
    })
}

export const loginWithFirebase = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(data => {
      return data.user.uid
    })
}

export const updatePasswordOnProfile = (newPassword) => {
  const user = firebase.auth().currentUser;
  user.updatePassword(newPassword).then(function () {
    // Update successful.
  }).catch(function (error) {
    // An error happened.
  });
}