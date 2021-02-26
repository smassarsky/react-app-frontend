import { config } from '../config'

export const userService = {
  login,
  signup,
  logout, 
  currentUser
}

function login(username, password) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password })
  }

  return fetch(`${config.baseUrl}/login`, options)
  .then(handleResponse)
}

function signup({ username, name, password, passwordConfirmation }) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      user: { 
        username, name, password, password_confirmation: passwordConfirmation}
    })
  }

  return fetch(`${config.baseUrl}/signup`, options)
  .then(handleResponse)
}

function logout() {
  localStorage.removeItem('user')
  const options = {
    method: 'DELETE',
    credentials: 'include'
  }
  return fetch(`${config.baseUrl}/logout`, options)
}

function currentUser() {
  
}

function handleResponse(response) {
  console.log(response)
  return response.json().then(json => {
    console.log(json)
    if (!response.ok || response.status !== 200) {
      const error = json.error || response.statusText
      return Promise.reject(error)
    }
    return json
  })
}

// function handleResponse(response) {
//   return response.text().then(text => {
//       const data = text && JSON.parse(text);
//       if (!response.ok) {
//           if (response.status === 401) {
//               logout();
//           }

//           const error = (data && data.message) || response.statusText;
//           return Promise.reject(error);
//       }

//       return data;
//   });
// }