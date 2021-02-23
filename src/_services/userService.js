import { config } from '../config'

export const userService = {
  login,
  signup,
  logout, 
  currentUser
}

function login({ username, password }) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }

  fetch(`${config.baseUrl}/login`, options)
  .then(resp => resp.json())
  .then(json => )
  
}

function signup({ username, name, password, passwordConfirmation }) {

}

function logout() {

}

function currentUser() {
  
}