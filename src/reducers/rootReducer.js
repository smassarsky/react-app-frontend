import { combineReducers } from 'redux'
import { userReducer as user } from './userReducer'
import {teams } from './teamsReducer'
import { alert } from './alertReducer'

const rootReducer = combineReducers({
  user,
  alert,
  teams
})

export default rootReducer

