import { combineReducers } from 'redux'
import { userReducer as user } from './userReducer'
import { teams } from './teamsReducer'
import { alert } from './alertReducer'
import { team } from './teamReducer'
import { seasons } from './seasonsReducer'
import { players } from './playersReducer'

const rootReducer = combineReducers({
  user,
  alert,
  teams,
  team
})

export default rootReducer

