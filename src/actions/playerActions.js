import camelcaseKeys from 'camelcase-keys'

import { teamConstants } from '../constants'
import { playerConstants } from '../constants'
import { playerService } from '../_services'
import { alertActions } from './alertActions'

export const playerActions = {
  show,
  create,
  update,
  destroy
}

function show(playerId) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    playerService.show(playerId)
      .then(
        player => {
          dispatch(success(camelcaseKeys(player)))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: playerConstants.SHOW_REQUEST } }
  function success(player) { return { type: playerConstants.SHOW_SUCCESS, player } }
  function failure() { return { type: playerConstants.SHOW_FAILURE } }
}

function create(teamId, playerParams) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    playerService.create(teamId, playerParams)
      .then(
        player => {
          dispatch(success(camelcaseKeys(player, {deep: true})))
          dispatch(alertActions.success("Player Created!"))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: teamConstants.CREATE_PLAYER_REQUEST } }
  function success(player) { return { type: teamConstants.CREATE_PLAYER_SUCCESS, player } }
  function failure() { return { type: teamConstants.CREATE_PLAYER_FAILURE } }
}

function update(player) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    playerService.update(player)
      .then(
        player => {
          dispatch(success(camelcaseKeys(player, {deep: true})))
          dispatch(alertActions.success("Player Updated!"))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: teamConstants.UPDATE_PLAYER_REQUEST } }
  function success(player) { return { type: teamConstants.UPDATE_PLAYER_SUCCESS, player } }
  function failure() { return { type: teamConstants.UPDATE_PLAYER_FAILURE } }
}

function destroy(playerId) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    playerService.destroy(playerId)
      .then(
        () => {
          dispatch(success(playerId))
          dispatch(alertActions.success("Player Deleted!"))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: teamConstants.DESTROY_PLAYER_REQUEST } }
  function success(playerId) { return { type: teamConstants.DESTROY_PLAYER_SUCCESS, playerId } }
  function failure() { return { type: teamConstants.DESTROY_PLAYER_FAILURE } }
}