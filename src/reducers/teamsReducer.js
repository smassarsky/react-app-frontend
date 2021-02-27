import { teamsConstants } from '../constants'

const initialState = {
  list: [],
  show: {},
}

export function teams(state = initialState, action) {
  switch(action.type) {
    case teamsConstants.INDEX_REQUEST:
      return {
        ...initialState,
        fetching: true
      }
    case teamsConstants.INDEX_SUCCESS:
      return {
        ...state,
        list: action.teams
      }
    case teamsConstants.INDEX_FAILURE:
      return initialState
    case teamsConstants.CREATE_REQUEST:
      return {
        ...state,
        createFetch: true
      }
    case teamsConstants.CREATE_SUCCESS:
      return {
        ...initialState,
        list: [...state.list, action.team]
      }
    case teamsConstants.CREATE_FAILURE:
      console.log(state)
      return {
        ...initialState,
        list: state.list
      }

    case teamsConstants.UPDATE_REQUEST:
      return {
        ...state,
        updateFetch: true
      }

    case teamsConstants.UPDATE_SUCCESS:
      if (state.show.id) {
        return { 
          ...initialState,
          show: action.team
        }
      } else {
        return {
          ...initialState,
          list: state.list.map(team => team.id === action.team.id ? action.team : team)
        }
      }

    case teamsConstants.UPDATE_FAILURE:
      return state.show.id ? { ...initialState, show: state.show } : { ...initialState, list: state.list }
    
    case teamsConstants.DESTROY_REQUEST:
      return {
        ...state,
        destroyFetch: true
      }
    case teamsConstants.DESTROY_SUCCESS:
      if (state.show.id) {
        return initialState
      } else {
        return {
          ...initialState,
          list: state.list.filter(team => team.id !== action.teamId)
        }
      }
    case teamsConstants.DESTROY_FAILURE:
      return state.show.id ? { ...initialState, show: state.show } : { ...initialState, list: state.list }
    default:
      return state
  }
}