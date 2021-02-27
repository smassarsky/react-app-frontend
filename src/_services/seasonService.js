import { config } from '../config'

export const seasonService = {
  show,
  create,
  update,
  destroy
}

function show(seasonId) {

}

function create(teamId, name) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ 'team_id': teamId, name })
  }

  return fetch(`${config.baseUrl}/seasons`, options)
    .then(handleResponse)
}

function update(seasonId, name) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ name })
  }
  return fetch(`${config.baseUrl}/seasons/${seasonId}`, options)
    .then(handleResponse)
}

function destroy(seasonId) {
  const options = {
    method: 'DELETE',
    credentials: 'include'
  }
  return fetch(`${config.baseUrl}/seasons/${seasonId}`, options)
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