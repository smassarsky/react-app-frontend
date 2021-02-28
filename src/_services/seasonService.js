import { config } from '../config'

export const seasonService = {
  show,
  create,
  update,
  destroy
}

function show(seasonId) {

}

function create(teamId, season) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ season: {...season, 'team_id': teamId } })
  }

  return fetch(`${config.baseUrl}/seasons`, options)
    .then(handleResponse)
}

function update(season) {
  const { id, name, current } = season
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ season: { name, current } })
  }
  return fetch(`${config.baseUrl}/seasons/${id}`, options)
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