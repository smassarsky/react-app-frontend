import { config } from '../config'

export const playerService = {
  show,
  create,
  update,
  destroy
}

function show(playerId) {

}

function create(teamId, player) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ player: { ...player, 'team_id': teamId } })
  }

  return fetch(`${config.baseUrl}/players`, options)
    .then(handleResponse)
}

function update(player) {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ player })
  }

  return fetch(`${config.baseUrl}/players/${player.id}`, options)
    .then(handleResponse)
}

function destroy(playerId) {
  const options = {
    method: 'DELETE',
    credentials: 'include'
  }
  
  return fetch(`${config.baseUrl}/players/${playerId}`, options)
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