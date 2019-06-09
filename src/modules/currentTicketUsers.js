const remoteURL = "http://localhost:8088"

export default {
  getCurrentTicketUser(id) {
    return fetch(`${remoteURL}/currentTicketUsers/${id}`).then(e => e.json())
  },

  getAllCurrentTicketUsers() {
    return fetch(`${remoteURL}/currentTicketUsers`).then(e => e.json())
  },

  deleteCurrentTicketUser(id) {
    return fetch(`${remoteURL}/currentTicketUsers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(e => e.json())
  },

  saveCurrentTicketUser(obj) {
    return fetch(`${remoteURL}/currentTicketUsers`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    // .then(e => e.json())
  },

  editCurrentTicketUser(editedCurrentTicketUser) {
    return fetch(`${remoteURL}/currentTicketUsers/${editedCurrentTicketUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedCurrentTicketUser)
    }).then(data => data.json());
  }
}