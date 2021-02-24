import { userConstants } from '../constants/userConstants'

let user = JSON.parse(localStorage.getItem('user'))
const initialState = user ? { loggedIn: true, username: user.username, name: user.name } : {}

export function userReducer(state = initialState, action) {
  switch(action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        username: action.user.username,
      }
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        username: action.user.username,
        name: action.user.name
      }
    case userConstants.LOGIN_FAILURE:
      return {}
    case userConstants.LOGOUT:
      return {}
    case userConstants.SIGNUP_REQUEST:
      return {
        signingUp: true,
        username: action.user.username,
        name: action.user.name
      }
    case userConstants.SIGNUP_SUCCESS:
      return {
        loggedIn: true,
        username: action.user.username,
        name: action.user.name
      }
    case userConstants.SIGNUP_FAILURE:
      return {}
    default:
      return state
  }
}