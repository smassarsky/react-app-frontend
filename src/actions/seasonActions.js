import camelcaseKeys from 'camelcase-keys'

import { teamConstants } from '../constants'

import { seasonService } from '../_services'

import { alertActions } from './alertActions'

export const seasonActions = {
  show,
  create,
  update,
  destroy
}

function show(seasonId) {

}

function create(teamId, season) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    seasonService.create(teamId, season)
      .then(
        newSeason => {
          dispatch(success(camelcaseKeys(newSeason)))
          dispatch(alertActions.success("Season Created!"))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )    
  }

  function request() { return { type: teamConstants.CREATE_SEASON_REQUEST } }
  function success(newSeason) { return { type: teamConstants.CREATE_SEASON_SUCCESS, season: newSeason } }
  function failure() { return { type: teamConstants.CREATE_SEASON_FAILURE } }
}

function update(season) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    seasonService.update(season)
      .then(
        updatedSeason => {
          dispatch(success(camelcaseKeys(updatedSeason)))
          dispatch(alertActions.success("Season Updated!"))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: teamConstants.UPDATE_SEASON_REQUEST } }
  function success(updatedSeason) { return { type: teamConstants.UPDATE_SEASON_SUCCESS, season: updatedSeason } }
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