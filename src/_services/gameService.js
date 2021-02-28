import { config } from '../config'

export const gameService = {
  show,
  create,
  update,
  destroy
}

function show(gameId) {
  return fetch(`${config.baseUrl}/games/${gameId}`, { credentials: 'include' })
    .then(handleResponse)
}

function create(seasonId, game) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ game: {...game, 'season_id': seasonId } })
  }

  return fetch(`${config.baseUrl}/games`, options)
    .then(handleResponse)
}

function update(game) {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ game })
  }

  return fetch(`${config.baseUrl}/games/${game.id}`, options)
  .then(handleResponse)
}

function destroy(gameId) {
  const options = {
    method: 'DELETE',
    credentials: 'include'
  }

  return fetch(`${config.baseUrl}/games/${gameId}`, options)
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