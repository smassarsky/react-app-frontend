import { config } from '../config'

export const teamService = {
  index,
  show,
  create,
  update,
  destroy
}

function index() {
  return fetch(`${config.baseUrl}/teams`, {credentials: 'include'})
  .then(handleResponse)
}

function show(teamId) {
  return fetch(`${config.baseUrl}/teams/${teamId}`, {credentials: 'include'})
  .then(handleResponse)
}

function create(name) {
  const options =  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ name })
  }
  return fetch(`${config.baseUrl}/teams`, options)
  .then(handleResponse)
}

function update(name, teamId) {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ team: { name } })
  }

  return fetch(`${config.baseUrl}/teams/${teamId}`, options)
  .then(handleResponse)
}

function destroy(teamId) {
  const options = {
    method: 'DELETE',
    credentials: 'include'
  }
  return fetch(`${config.baseUrl}/teams/${teamId}`, options)
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