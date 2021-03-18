import camelcaseKeys from 'camelcase-keys'

import { playerCodeConstants } from '../constants'

import { playerCodeService } from '../_services'

import { alertActions } from './alertActions'

import { history } from '../_helpers/history'

export const playerCodeActions = {
  create,
  show,
  link
}

function create(playerId) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    return playerCodeService.create(playerId)
      .then(
        playerCode => {
          dispatch(success(camelcaseKeys(playerCode, { deep: true }), playerId))
          return Promise.resolve()
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: playerCodeConstants.CREATE_CODE_REQUEST } }
  function success(playerCode) { return { type: playerCodeConstants.CREATE_CODE_SUCCESS, playerCode, playerId } }
  function failure() { return { type: playerCodeConstants.CREATE_CODE_FAILURE } }
}

function show(playerCode) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    playerCodeService.show(playerCode)
      .then(
        playerCode => {
          dispatch(success(camelcaseKeys(playerCode)))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }
  function request() { return { type: playerCodeConstants.SHOW_CODE_REQUEST } }
  function success(playerCode) { return { type: playerCodeConstants.SHOW_CODE_SUCCESS, playerCode } }
  function failure() { return { type: playerCodeConstants.SHOW_CODE_FAILURE } }
}

function link(playerCode) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    playerCodeService.link(playerCode)
      .then(
        () => {
          history.push(`/teams/${playerCode.player.team.id}`)
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }
  function request() { return { type: playerCodeConstants.LINK_PLAYER_REQUEST } }
  function failure() { return { type: playerCodeConstants.LINK_PLAYER_FAILURE } }
}