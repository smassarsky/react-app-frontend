import { config } from '../config'

export const gamePlayerService = {
  add,
  remove
}

function add(gameId, playerId) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ gameId, playerId })
  }

  return fetch(`${config.baseUrl}/add-player`, options)
    .then(handleResponse)
}

function remove(gameId, playerId) {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ gameId, playerId })
  }

  return fetch(`${config.baseUrl}/remove-player`, options)
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