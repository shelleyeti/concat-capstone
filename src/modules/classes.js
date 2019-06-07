const remoteURL = "http://localhost:8088"

export default {
  getClass(id) {
    return fetch(`${remoteURL}/classes/${id}`).then(e => e.json())
  },

  getAllClasses() {
    return fetch(`${remoteURL}/classes`).then(e => e.json())
  },

  deleteClass(id) {
    return fetch(`${remoteURL}/classes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(e => e.json())
  },

  saveClass(obj) {
    return fetch(`${remoteURL}/classes`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    // .then(e => e.json())
  },

  editClass(editedClass) {
    return fetch(`${remoteURL}/classes/${editedClass.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedClass)
    }).then(data => data.json());
  }
}