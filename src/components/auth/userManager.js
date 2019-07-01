import * as firebase from 'firebase/app';
import 'firebase/auth';
import saveUserToFirebase from '../../modules/userManager'

const setUserInSessionStorage = (user) => {
  sessionStorage.setItem('user', JSON.stringify(user));
}

//username email and password
export const register = (user) => {
  return registerWithFirebase(user.email, user.password)
    .then(firebaseId => {
      if (firebaseId === null || firebaseId === undefined)
        return null;

      user.password = null;
      user.id = firebaseId;
      return saveUserToFirebase.saveUser(user)
    })
    .then(newUserFromFirebase => {
      if (newUserFromFirebase === null || newUserFromFirebase === undefined)
        return null;

      setUserInSessionStorage(newUserFromFirebase);
      return newUserFromFirebase;
    })
    .catch(function (error) {
      alert(`Yikes, you did not register`)
      console.log(error)
    })
}

export const login = (email, password) => {
  return loginWithFirebase(email, password)
    .then(firebaseId => {
      return getUser(firebaseId)
    })
    .then(userFromFirebase => {
      setUserInSessionStorage(userFromFirebase);
      return userFromFirebase
    })
}

export const getUser = (userId) => {
  return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
    return snapshot.val();
  });
}

export const getUserFromSessionStorage = () => {
  const user = sessionStorage.getItem('user');

  if (!user) return null;

  return JSON.parse(user);
}

export const logout = () => {
  sessionStorage.removeItem('user');
}

export const registerWithFirebase = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(data => {
      return data.user.uid
    }).catch((error) => {
      if (typeof (error) === "object" && error.hasOwnProperty("message")) {
        alert(error.message);
      } else {
        alert(`Burn your computer and try again`)
      }
    })
}

export const loginWithFirebase = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(data => {
      return data.user.uid
    }).catch(() => {
      alert(`No LoG iN. TrY AgAiN`)
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