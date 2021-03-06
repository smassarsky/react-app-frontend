import { combineReducers } from 'redux'
import { userReducer as user } from './userReducer'
import { teams } from './teamsReducer'
import { alert } from './alertReducer'
import { team } from './teamReducer'
import { season } from './seasonReducer'
import { game } from './gameReducer'

const rootReducer = combineReducers({
  user,
  alert,
  teams,
  team,
  season,
  game
})

export default rootReducer

