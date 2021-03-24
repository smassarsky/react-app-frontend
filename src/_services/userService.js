import { config } from '../config'

export const userService = {
  login,
  signup,
  logout,
  dashboard
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

function dashboard() {
  return fetch(`${config.baseUrl}/dashboard`, {credentials: 'include'})
    .then(handleResponse)
}

function handleResponse(response) {
  return response.json().then(json => {
    if (!response.ok || response.status !== 200) {
      const error = json.error || response.statusText
      return Promise.reject(error)
    }
    return json
  })
}
