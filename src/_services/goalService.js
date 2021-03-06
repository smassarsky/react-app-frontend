import { config } from '../config'

export const goalService = {
  create,
  update,
  destroy
}

function create(gameId, goal) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ goal: {...goal, gameId } })
  }

  return fetch(`${config.baseUrl}/goals`, options)
    .then(handleResponse)
}

function update(goal) {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ goal })
  }

  return fetch(`${config.baseUrl}/goals/${goal.id}`, options)
    .then(handleResponse)
}

function destroy(goalId) {
  const options = {
    method: 'DELETE',
    credentials: 'include'
  }

  return fetch(`${config.baseUrl}/goals/${goalId}`, options)
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