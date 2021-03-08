import { seasonConstants } from '../constants'

const initialState = {
  details: {
    games: [],
    players: [],
    team: {id: null, name: null}
  }
}

export function season(state = initialState, action) {
  switch(action.type) {
    case seasonConstants.SHOW_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case seasonConstants.SHOW_SUCCESS:
      return {
        details: action.season
      }
    case seasonConstants.SHOW_FAILURE:
      return initialState
    case seasonConstants.CREATE_GAME_REQUEST:
      return {
        ...state,
        createGameFetch: true
      }
    case seasonConstants.CREATE_GAME_SUCCESS:
      return {
        details: {
          ...state.details,
          games: [...state.details.games, action.game]
        }
      }
    case seasonConstants.CREATE_GAME_FAILURE:
      return {
        details: {
          ...state.details
        }
      }
    case seasonConstants.UPDATE_GAME_REQUEST:
      return {
        ...state,
        updateGameFetch: true
      }
    case seasonConstants.UPDATE_GAME_SUCCESS:
      return {
        details: {
          ...state.details,
          games: state.details.games.map(game => game.id === action.game.id ? action.game : game)
        }
      }
    case seasonConstants.UPDATE_GAME_FAILURE:
      return {
        details: {
          ...state.details
        }
      }
    case seasonConstants.DESTROY_GAME_REQUEST:
      return {
        ...state,
        destroyGameFetch: true
      }
    case seasonConstants.DESTROY_GAME_SUCCESS:
      return {
        details: {
          ...state.details,
          games: state.details.games.filter(game => game.id !== action.gameId)
        }
      }
    case seasonConstants.DESTROY_GAME_FAILURE:
      return {
        details: {
          ...state.details
        }
      }
    default:
      return state
  }
}