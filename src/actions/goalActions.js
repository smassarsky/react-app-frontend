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

    goalService.create(gameId, goal)
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
  function success(goal) { return { type: gameConstants.CREATE_GOAL_SUCCESS } }
  function failure() { return { type: gameConstants.CREATE_GOAL_FAILURE } }
}

function update(goal) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    goalService.update(goal)
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