import { config } from '../config'

export const playerCodeService = {
  create,
  show,
  link
}

function create(playerId) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ playerId })
  }

  return fetch(`${config.baseUrl}/create-code`, options)
    .then(handleResponse)
}

function show(playerCode) {
  return fetch(`${config.baseUrl}/player-codes/${playerCode}`, {credentials: 'include'})
    .then(handleResponse)
}

function link(playerCode) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ code: playerCode })
  }
  return fetch(`${config.baseUrl}/link-code`, options)
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