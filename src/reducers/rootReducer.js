import { combineReducers } from 'redux'
import { userReducer as user } from './userReducer'
import { teams } from './teamsReducer'
import { alert } from './alertReducer'
import { team } from './teamReducer'
import { season } from './seasonReducer'
import { game } from './gameReducer'
import { dashboard } from './dashboardReducer'

const rootReducer = combineReducers({
  user,
  alert,
  teams,
  team,
  season,
  game,
  dashboard
})

export default rootReducer

