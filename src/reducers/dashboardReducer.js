import { userConstants } from '../constants'

const initialState = {
  upcomingGames: [],
  recentGames: []
}

export function dashboard(state = initialState, action) {
  switch(action.type) {
    case userConstants.DASHBOARD_REQUEST:
      return {
        ...state,
        fetchingDashboard: true
      }
    case userConstants.DASHBOARD_SUCCESS:
      return action.resp
    case userConstants.DASHBOARD_FAILURE:
      return initialState
    default:
      return state
  }
}