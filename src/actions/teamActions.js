import camelcaseKeys from 'camelcase-keys'

import { alertActions } from './alertActions'
import { store } from '../_helpers/store'
import { config } from '../config'

export const teamActions = {
  index,
  create,
  update,
  destroy
}

function index() {
  return fetch(`${config.baseUrl}/teams`, {credentials: 'include'})
  .then(handleResponse)
  .then(teams => camelcaseKeys(teams), error => store.dispatch(alertActions.error(error)))
}

function create(name) {
  console.log(name)
  const options =  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ name })
  }

  console.log(options)
  return fetch(`${config.baseUrl}/teams`, options)
  .then(handleResponse)
  .then(team => {
    store.dispatch(alertActions.success("Team Created!"))
    return camelcaseKeys(team)
  }, error => store.dispatch(alertActions.error(error)))
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
  .then(team => {
    store.dispatch(alertActions.success("Team Updated!"))
    return camelcaseKeys(team)
  }, error => store.dispatch(alertActions.error(error)))
}

function destroy(teamId) {
  console.log(teamId)
  const options = {
    method: 'DELETE',
    credentials: 'include'
  }
  return fetch(`${config.baseUrl}/teams/${teamId}`, options)
  .then(handleResponse)
  .then(success => {
    store.dispatch(alertActions.success(success.message))
    return true
  },
  error => store.dispatch(alertActions.error(error.message)))
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