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
    return fetch(`${remoteURL}/users`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    // .then(e => e.json())
  },

  editUser(editedUser) {
    return fetch(`${remoteURL}/users/${editedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedUser)
    }).then(data => data.json());
  }
}