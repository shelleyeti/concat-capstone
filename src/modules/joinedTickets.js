const remoteURL = "http://localhost:8088"

export default {
  getJoinedTicket(id) {
    return fetch(`${remoteURL}/joinedTickets/${id}`).then(e => e.json())
  },

  getAllJoinedTickets() {
    return fetch(`${remoteURL}/joinedTickets`).then(e => e.json())
  },

  deleteJoinedTicket(id) {
    return fetch(`${remoteURL}/joinedTickets/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(e => e.json())
  },

  saveJoinedTicket(obj) {
    return fetch(`${remoteURL}/joinedTickets`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    // .then(e => e.json())
  },

  editJoinedTicket(editedJoinedTicket) {
    return fetch(`${remoteURL}/joinedTickets/${editedJoinedTicket.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedJoinedTicket)
    }).then(data => data.json());
  }
}