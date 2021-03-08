import { gameConstants } from '../constants'

const initialState = {
  details: {
    goals: [],
    penalties: [],
    playersList: [],
    score: {},
    team: { id: null, name: null },
    season: { id: null, name: null },
    owner: { id: null }
  }
}

export function game(state = initialState, action) {
  switch(action.type) {
    case gameConstants.SHOW_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case gameConstants.SHOW_SUCCESS:
      return {
        details: action.game
      }
    case gameConstants.SHOW_FAILURE:
      return initialState
    case gameConstants.CREATE_GOAL_REQUEST:
      return {
        ...state,
        createGoalFetch: true
      }
    case gameConstants.CREATE_GOAL_SUCCESS:
      return {
        details: {
          ...state.details,
          goals: [...state.details.goals, action.goal]
        }
      }
    case gameConstants.CREATE_GOAL_FAILURE:
      return {
        details: {
          ...state.details
        }
      }
    case gameConstants.UPDATE_GOAL_REQUEST:
      return {
        ...state,
        updateGoalFetch: true
      }
    case gameConstants.UPDATE_GOAL_SUCCESS:
      return {
        details: {
          ...state.details,
          goals: state.details.goals.map(goal => goal.id === action.goal.id ? action.goal : goal)
        }
      }
    case gameConstants.UPDATE_GOAL_FAILURE:
      return {
        details: {
          ...state.details
        }
      }
    case gameConstants.DESTROY_GOAL_REQUEST:
      return {
        ...state,
        destroyGoalFetch: true
      }
    case gameConstants.DESTROY_GOAL_SUCCESS:
      return {
        details: {
          ...state.details,
          goals: state.details.goals.filter(goal => goal.id !== action.goalId)
        }
      }
    case gameConstants.DESTROY_GOAL_FAILURE:
      return {
        details: {
          ...state.details
        }
      }
    case gameConstants.CREATE_PENALTY_REQUEST:
      return {
        ...state,
        createPenaltyFetch: true
      }
    case gameConstants.CREATE_PENALTY_SUCCESS:
      return {
        details: {
          ...state.details,
          penalties: [...state.details.penalties, action.penalty]
        }
      }
    case gameConstants.CREATE_PENALTY_FAILURE:
      return {
        details: {
          ...state.details
        }
      }
    case gameConstants.UPDATE_PENALTY_REQUEST:
      return {
        ...state,
        updatePenaltyFetch: true
      }
    case gameConstants.UPDATE_PENALTY_SUCCESS:
      return {
        details: {
          ...state.details,
          penalties: state.details.penalties.map(penalty => penalty.id === action.penalty.id ? action.penalty : penalty)
        }
      }
    case gameConstants.UPDATE_PENALTY_FAILURE:
      return {
        details: {
          ...state.details
        }
      }
    case gameConstants.DESTROY_PENALTY_REQUEST:
      return {
        ...state,
        destroyPenaltyFetch: true
      }
    case gameConstants.DESTROY_PENALTY_SUCCESS:
      return {
        details: {
          ...state.details,
          penalties: state.penalties.filter(penalty => penalty.id !== action.penaltyId)
        }
      }
    case gameConstants.DESTROY_PENALTY_FAILURE:
      return {
        details: {
          ...state.details
        }
      }
    case gameConstants.ADD_PLAYER_REQUEST:
      return {
        ...state,
        addPlayerFetch: true
      }
    case gameConstants.ADD_PLAYER_SUCCESS:
      console.log(state, action)
      return {
        details: {
          ...state.details,
          usersPlayer: {
            ...state.details.usersPlayer,
            attending: action.isUser ? true : state.details.usersPlayer.attending
          },
          playersList: [...state.details.playersList, action.player]
        }
      }
    case gameConstants.ADD_PLAYER_FAILURE:
      return {
        details: {
          ...state.details
        }
      }
    case gameConstants.REMOVE_PLAYER_REQUEST:
      return {
        ...state,
        removePlayerFetch: true
      }
    case gameConstants.REMOVE_PLAYER_SUCCESS:
      console.log(state, action)
      return {
        details: {
          ...state.details,
          usersPlayer: {
            ...state.details.usersPlayer,
            attending: action.isUser ? false : state.details.usersPlayer.attending
          },
          playersList: state.details.playersList.filter(player => player.id !== action.playerId)
        }
      }
    case gameConstants.REMOVE_PLAYER_FAILURE:
      return {
        details: {
          ...state.details
        }
      }
    default:
      return state
  }
}