/*

The idea here is to do authentication through firebase. This is an alternative
to using the json-server-auth package, but there are tradeoffs 
for both.

Here is the workflow:

REGISTER
1) Get username and password from a form and submit it to firebase auth
2) Firebase will register the new user and return a uid for that user
3) Take the uid from firebase and whatever profile info you need and save a record to json-server

```
{
  username: 'Adam',
  email: 'adam.nss@gmail.com'
  bio: 'lots of interesting facts...'
  id: <uid from firebase>
}
```

4) Save record to local/session storage
5) Update 'user' state in your react app

LOGIN
1) Get username and password from login and log into firebase
2) Firebase will return an existing user with his/her uid
3) Use the firebase uid to make a GET call to json-server for the profile info
4) Save record to local/session storage
5) update 'user' state in your react app

LOGOUT
1) Logout from firebase
2) Remove record from local/session storage
3) update 'user' state in your react app to null


PROS
- Students don't have to manage user passwords

- Allows students to easily add auth providers like google with not
much more effort

- Easier learning curve. The json-server-auth package might invite 
too many questions about express and jwt's. Although there is an extra
step in this workflow, it's not adding anything to their codebase that they
haven't already seen


CONS
- Although user passwords are secure, their data won't be. The json-server-auth
packages uses jwt's to protect certain routes. Any user with knowledge of another
user's uid could technically change the values in their local storage and pretend
to be the other user.

*/

import * as firebase from 'firebase/app'
import 'firebase/auth'

const url = 'http://localhost:8088/users';

const setUserInLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
}

//username email and password
export const register = (user) => {
  return registerWithFirebase(user.email, user.password)
    .then(firebaseId => {
      user.password = null;
      user.id = firebaseId;
      return saveUserToJsonServer(user)
    })
    .then(newUserFromJSONServer => {
      setUserInLocalStorage(newUserFromJSONServer);
      return newUserFromJSONServer;
    })
    .catch(function (error) {
      alert(`Yikes`)
    })
}

export const login = (email, password) => {
  return loginWithFirebase(email, password)
    .then(firebaseId => {
      return getUser(firebaseId)
    })
    .then(userFromJSONServer => {
      setUserInLocalStorage(userFromJSONServer);
      return userFromJSONServer
    })
    .catch(() => {
      alert(`No LoG iN`)
    });
}

export const saveUserToJsonServer = (user) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(newUser => {
      setUserInLocalStorage(newUser);
      return newUser;
    });
}

export const getUser = (userId) => {
  return fetch(`${url}/${userId}`)
    .then(res => res.json());
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