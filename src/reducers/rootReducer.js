import { combineReducers } from 'redux'
import { userReducer as user } from './userReducer'
import { alert } from './alertReducer'

const rootReducer = combineReducers({
  user,
  alert
})

export default rootReducer

