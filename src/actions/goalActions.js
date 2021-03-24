import camelcaseKeys from 'camelcase-keys'

import { gameConstants } from '../constants'
import { goalService } from '../_services/goalService'
import { alertActions } from './alertActions'

export const goalActions = {
  create,
  update,
  destroy
}

function create(gameId, goal) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    const goalOut = {
      teamId: goal.team ? goal.team.id : null,
      playerId: goal.player ? goal.player.id : null,
      assistPlayerIds: goal.assistPlayers.map(player => player.id),
      onIcePlayerIds: goal.onIcePlayers.map(player => player.id),
      period: goal.period,
      time: `${goal.minutes}`.padStart(2, '0') + ':' + `${goal.seconds}`.padStart(2, '0')
    }

    goalService.create(gameId, goalOut)
      .then(
        goal => {
          dispatch(success(camelcaseKeys(goal, { deep: true })))
          dispatch(alertActions.success("GoalCreated"))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: gameConstants.CREATE_GOAL_REQUEST } }
  function success(goal) { return { type: gameConstants.CREATE_GOAL_SUCCESS, goal } }
  function failure() { return { type: gameConstants.CREATE_GOAL_FAILURE } }
}

function update(goal) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    const goalOut = {
      id: goal.goalId,
      teamId: goal.team.id === {} ? null : goal.team.id,
      playerId: goal.player === {} ? null : goal.player.id,
      assistPlayerIds: goal.assistPlayers.map(player => player.id),
      onIcePlayerIds: goal.onIcePlayers.map(player => player.id),
      period: goal.period,
      time: `${goal.minutes}`.padStart(2, '0') + ':' + `${goal.seconds}`.padStart(2, '0')
    }

    goalService.update(goalOut)
      .then(
        goal => {
          dispatch(success(camelcaseKeys(goal, { deep: true })))
          dispatch(alertActions.success("Goal Updated!"))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: gameConstants.UPDATE_GOAL_REQUEST } }
  function success(goal) { return { type: gameConstants.UPDATE_GOAL_SUCCESS, goal } }
  function failure() { return { type: gameConstants.UPDATE_GOAL_FAILURE } }
}

function destroy(goalId) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    goalService.destroy(goalId)
      .then(
        () => {
          dispatch(success(goalId))
          dispatch(alertActions.success("Goal Deleted!"))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: gameConstants.DESTROY_GOAL_REQUEST } }
  function success(goalId) { return { type: gameConstants.DESTROY_GOAL_SUCCESS, goalId } }
  function failure() { return { type: gameConstants.DESTROY_GOAL_FAILURE } }
}