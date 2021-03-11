import { config } from '../config'

export const penaltyService = {
  create,
  update,
  destroy
}

function create(gameId, penalty) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ penalty: { ...penalty, gameId } })
  }

  return fetch(`${config.baseUrl}/penalties`, options)
    .then(handleResponse)
}

function update(penalty) {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ penalty })
  }

  return fetch(`${config.baseUrl}/penalties/${penalty.id}`, options)
    .then(handleResponse)
}

function destroy(penaltyId) {
  const options = {
    method: 'DELETE',
    credentials: 'include'
  }

  return fetch(`${config.baseUrl}/penalties/${penaltyId}`, options)
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