import camelcaseKeys from 'camelcase-keys'

import { teamConstants } from '../constants'

import { seasonService, teamService } from '../_services'

import { alertActions } from './alertActions'

export const seasonActions = {
  show,
  create,
  update,
  destroy
}

function show(seasonId) {

}

function create(teamId, name) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    seasonService.create(teamId, name)
      .then(
        season => {
          dispatch(success(camelcaseKeys(season)))
          dispatch(alertActions.success("Season Created!"))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )    
  }

  function request() { return { type: teamConstants.CREATE_SEASON_REQUEST } }
  function success(season) { return { type: teamConstants.CREATE_SEASON_SUCCESS, season } }
  function failure() { return { type: teamConstants.CREATE_SEASON_FAILURE } }
}

function update(seasonId, name) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    seasonService.update(seasonId, name)
      .then(
        season => {
          dispatch(success(camelcaseKeys(season)))
          dispatch(alertActions.success("Season Updated!"))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: teamConstants.UPDATE_SEASON_REQUEST } }
  function success(season) { return { type: teamConstants.UPDATE_SEASON_SUCCESS } }
  function failure() { return { type: teamConstants.UPDATE_SEASON_FAILURE } }
}

function destroy(seasonId) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    seasonService.destroy(seasonId)
      .then(
        () => {
          dispatch(success(seasonId))
          dispatch(alertActions.success("Season Destroyed"))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: teamConstants.DESTROY_SEASON_REQUEST } }
  function success(seasonId) { return { type: teamConstants.DESTROY_SEASON_SUCCESS, seasonId } }
  function failure() { return { type: teamConstants.DESTROY_SEASON_FAILURE}}
}