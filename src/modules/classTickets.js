const remoteURL = "http://localhost:8088"

export default {
  getClassTicket(id) {
    return fetch(`${remoteURL}/classTickets/${id}`).then(e => e.json())
  },

  getAllClassTickets() {
    return fetch(`${remoteURL}/classTickets`).then(e => e.json())
  },

  deleteClassTicket(id) {
    return fetch(`${remoteURL}/classTickets/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(e => e.json())
  },

  saveClassTicket(obj) {
    return fetch(`${remoteURL}/classTickets`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    // .then(e => e.json())
  },

  editClassTicket(editedClassTicket) {
    return fetch(`${remoteURL}/classTickets/${editedClassTicket.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedClassTicket)
    }).then(data => data.json());
  }
}