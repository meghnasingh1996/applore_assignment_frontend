export function getUser() {
    return fetch('http://localhost:4000/api/all-user')
      .then(data => data.json())
  };