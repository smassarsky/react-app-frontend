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
          dispatch(success(camelcaseKeys(player)))
          dispatch(alertActions.success("Player Created!"))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: teamConstants.CREATE_PLAYER_REQUEST } }
  function success(player) { return { type: teamConstants.CREATE_PLAYER_SUCCESS } }
  function failure() { return { type: teamConstants.CREATE_PLAYER_FAILURE } }
}

function update(playerId, player) {

}

function destroy(playerId) {

}