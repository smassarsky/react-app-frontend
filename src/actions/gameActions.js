import camelcaseKeys from 'camelcase-keys'

import { seasonConstants } from '../constants'
import { gameConstants } from '../constants'
import { gameService } from '../_services/gameService'
import { alertActions } from './alertActions'

export const gameActions = {
  show,
  create,
  update,
  destroy
}

function show(gameId) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    gameService.show(gameId)
      .then(
        game => {
          dispatch(success(camelcaseKeys(game, {deep: true})))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: gameConstants.SHOW_REQUEST } }
  function success(game) { return { type: gameConstants.SHOW_SUCCESS, game } }
  function failure() { return { type: gameConstants.SHOW_FAILURE } }
}

function create(seasonId, gameParams) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    gameService.create(seasonId, gameParams)
      .then(
        game => {
          dispatch(success(camelcaseKeys(game, { deep: true })))
          dispatch(alertActions.success("Game Created!"))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: seasonConstants.CREATE_GAME_REQUEST } }
  function success(game) { return { type: seasonConstants.CREATE_GAME_SUCCESS, game }}
  function failure() { return { type: seasonConstants.CREATE_GAME_FAILURE } }
}

function update(game) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    gameService.update(game)
      .then(
        game => {
          dispatch(success(camelcaseKeys(game, { deep: true })))
          dispatch(alertActions.success("Game Updated!"))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: seasonConstants.UPDATE_GAME_REQUEST } }
  function success(game) { return { type: seasonConstants.UPDATE_GAME_SUCCESS, game } }
  function failure() { return { type: seasonConstants.UPDATE_GAME_FAILURE } }
}

function destroy(gameId) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    gameService.destroy(gameId)
      .then(
        () => {
          dispatch(success(gameId))
          dispatch(alertActions.success("Game Deleted!"))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: seasonConstants.DESTROY_GAME_REQUEST } }
  function success(gameId) { return { type: seasonConstants.DESTROY_GAME_SUCCESS, gameId } }
  function failure() { return { type: seasonConstants.DESTROY_GAME_FAILURE } }
}