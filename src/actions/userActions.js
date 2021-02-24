import { userConstants } from '../constants'
import { alertActions } from './alertActions'
import { userService } from '../_services'
import { history } from '../_helpers/history'

export const userActions = {
  signup,
  login,
  logout
}

function signup(fields) {
  return dispatch => {
    dispatch(request({ username: fields.username }))
    dispatch(alertActions.clear())

    userService.signup(fields)
      .then(
        user => {
          dispatch(success(user))
          history.push('/dashboard')
        },
        error => {
          console.log(error)
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request(username) { return { type: userConstants.SIGNUP_REQUEST, username } }
  function success(user) { return { type: userConstants.SIGNUP_SUCCESS, user } }
  function failure(error) { return {type: userConstants.SIGNUP_FAILURE, error } }
}

function login({ username, password }) {
  return dispatch => {
    dispatch(request({ username }))
    dispatch(alertActions.clear())

    userService.login(username, password)
      .then(
        user => {
          dispatch(success(user))
          history.push('/dashboard')
        },
        error => {
          console.log(error)
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
  return dispatch => {
    dispatch({ type: userConstants.LOGOUT })
    userService.logout()
      .then(() => history.push('/'))
  }
}