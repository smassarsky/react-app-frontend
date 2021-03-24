import camelcaseKeys from 'camelcase-keys'

import { gameConstants } from '../constants'
import { penaltyService } from '../_services/penaltyService'
import { alertActions } from './alertActions'

export const penaltyActions = {
  create,
  update,
  destroy
}

function create(gameId, penalty) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    const penaltyOut = {
      teamId: penalty.team ? penalty.team.id : null,
      playerId: penalty.player ? penalty.player.id : null,
      period: penalty.period,
      time: `${penalty.minutes}`.padStart(2, '0') + ':' + `${penalty.seconds}`.padStart(2, '0'),
      infraction: penalty.infraction,
      length: penalty.length
    }

    penaltyService.create(gameId, penaltyOut)
      .then(
        penalty => {
          dispatch(success(camelcaseKeys(penalty, { deep: true })))
          dispatch(alertActions.success("Penalty Created"))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: gameConstants.CREATE_PENALTY_REQUEST } }
  function success(penalty) { return { type: gameConstants.CREATE_PENALTY_SUCCESS, penalty } }
  function failure() { return { type: gameConstants.CREATE_PENALTY_FAILURE } }
}

function update(penalty) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    const penaltyOut = {
      id: penalty.penaltyId,
      teamId: penalty.team ? penalty.team.id : null,
      playerId: penalty.player ? penalty.player.id : null,
      period: penalty.period,
      time: `${penalty.minutes}`.padStart(2, '0') + ':' + `${penalty.seconds}`.padStart(2, '0'),
      infraction: penalty.infraction,
      length: penalty.length
    }

    penaltyService.update(penaltyOut)
      .then(
        penalty => {
          dispatch(success(camelcaseKeys(penalty, { deep: true })))
          dispatch(alertActions.success("Penalty Updated"))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: gameConstants.UPDATE_PENALTY_REQUEST } }
  function success(penalty) { return { type: gameConstants.UPDATE_PENALTY_SUCCESS, penalty } }
  function failure() { return { type: gameConstants.UPDATE_PENALTY_FAILURE } }
}

function destroy(penaltyId) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    penaltyService.destroy(penaltyId)
      .then(
        () => {
          dispatch(success(penaltyId))
          dispatch(alertActions.success("Penalty Deleted"))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: gameConstants.DESTROY_PENALTY_REQUEST } }
  function success(penaltyId) { return { type: gameConstants.DESTROY_PENALTY_SUCCESS, penaltyId } }
  function failure() { return { type: gameConstants.DESTROY_PENALTY_FAILURE } }
}