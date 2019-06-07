const remoteURL = "http://localhost:8088"

export default {
  getTicket(id) {
    return fetch(`${remoteURL}/tickets/${id}`).then(e => e.json())
  },

  getAllTickets() {
    return fetch(`${remoteURL}/tickets`).then(e => e.json())
  },

  saveTicket(obj) {
    return fetch(`${remoteURL}/tickets`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    // .then(e => e.json())
  },

  editTicket(editedTicket) {
    return fetch(`${remoteURL}/tickets/${editedTicket.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedTicket)
    }).then(data => data.json());
  }
}
