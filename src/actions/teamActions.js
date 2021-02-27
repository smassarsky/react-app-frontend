import camelcaseKeys from 'camelcase-keys'

import { teamsConstants } from '../constants'
import { teamConstants } from '../constants'
import { teamService } from '../_services'
import { alertActions } from './alertActions'

export const teamActions = {
  index,
  show,
  create,
  update,
  destroy
}

function index() {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    teamService.index()
      .then(
        teams => {
          dispatch(success(camelcaseKeys(teams)))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: teamsConstants.INDEX_REQUEST } }
  function success(teams) { return { type: teamsConstants.INDEX_SUCCESS, teams } }
  function failure() {return { type: teamsConstants.INDEX_FAILURE } }
}

function show(teamId) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    teamService.show(teamId)
      .then(
        team => {
          dispatch(success(camelcaseKeys(team)))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: teamConstants.SHOW_REQUEST } }
  function success(team) { return { type: teamConstants.SHOW_SUCCESS, team } }
  function failure() { return { type: teamConstants.SHOW_FAILURE } }
}

function create(name) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    teamService.create(name)
      .then(
        team => {
          dispatch(success(camelcaseKeys(team)))
          dispatch(alertActions.success("Team Created!"))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )

    function request() { return { type: teamsConstants.CREATE_REQUEST } }
    function success(team) { return { type: teamsConstants.CREATE_SUCCESS, team } }
    function failure() { return { type: teamsConstants.CREATE_FAILURE } }
  }
}

function update(name, teamId) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    teamService.update(name, teamId)
      .then(
        team => {
          dispatch(success(camelcaseKeys(team)))
          dispatch(alertActions.success("Team Updated!"))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: teamsConstants.UPDATE_REQUEST } }
  function success(team) { return { type: teamsConstants.UPDATE_SUCCESS, team } }
  function failure() { return { type: teamsConstants.UPDATE_FAILURE } }
}

function destroy(teamId) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    teamService.destroy(teamId)
      .then(
        () => {
          dispatch(success(teamId))
          dispatch(alertActions.success("Team Destroyed"))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: teamsConstants.DESTROY_REQUEST } }
  function success(teamId) { return { type: teamsConstants.DESTROY_SUCCESS, teamId } }
  function failure() { return { type: teamsConstants.DESTROY_FAILURE } }
}