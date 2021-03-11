import camelcaseKeys from 'camelcase-keys'

import { gameConstants } from '../constants'
import { gamePlayerService } from '../_services/gamePlayerService'
import { alertActions } from './alertActions'

export const gamePlayerActions = {
  add,
  remove
}

function add(gameId, playerId, isUser) {
  console.log(isUser)
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    gamePlayerService.add(gameId, playerId)
      .then(
        player => {
          dispatch(success(camelcaseKeys({...player, isUser}, { deep: true })))
          dispatch(alertActions.success("Player Added!"))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }
  function request() { return { type: gameConstants.ADD_PLAYER_REQUEST } }
  function success(player) { return { type: gameConstants.ADD_PLAYER_SUCCESS, player, isUser } }
  function failure() { return { type: gameConstants.ADD_PLAYER_FAILURE } }
}

function remove(gameId, playerId, isUser) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    gamePlayerService.remove(gameId, playerId)
      .then(
        () => {
          dispatch(success(playerId))
          dispatch(alertActions.success("Player Removed!"))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: gameConstants.REMOVE_PLAYER_REQUEST } }
  function success(playerId) { return { type: gameConstants.REMOVE_PLAYER_SUCCESS, playerId, isUser } }
  function failure() { return { type: gameConstants.REMOVE_PLAYER_FAILURE } }
}