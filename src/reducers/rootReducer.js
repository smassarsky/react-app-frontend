import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  user: userReducer
})

export default rootReducer


function userReducer(state = [], action) {
  switch(action.type) {
    case 'USERS_LOGIN_REQUEST':
      return
    case 'USERS_LOGIN_SUCCESS':
      return
    case 'USERS_LOGIN_FAILURE':
      return
    case 'USERS_LOGOUT':
      return
  }
}