import { teamConstants } from '../constants'

const initialState = {
  details: {
    seasons: [],
    players: []
  }
}

export function team(state = initialState, action) {
  switch(action.type) {
    case teamConstants.SHOW_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case teamConstants.SHOW_SUCCESS:
      return {
        details: action.team,
      }
    case teamConstants.SHOW_FAILURE:
      return initialState

    case teamConstants.CREATE_SEASON_REQUEST:
      return {
        ...state,
        createSeasonFetch: true
      }

    case teamConstants.CREATE_SEASON_SUCCESS:
      //only one current season
      const newSeasons = action.season.current ? (
        [...state.details.seasons.map(season => {
          if (season.current) {
            return {...season, current: false}
          } else {
            return season
          }
        }), action.season]) : [...state.details.seasons, action.season]

      return {
        details: {
          ...state.details,
          seasons: newSeasons
        }
      }

    case teamConstants.CREATE_SEASON_FAILURE:
      return {
        details: {
          ...state.details
        }
      }


    case teamConstants.UPDATE_SEASON_REQUEST:
      return {
        ...state,
        updateSeasonFetch: true
      }

    case teamConstants.UPDATE_SEASON_SUCCESS:
      return {
        details: {
          ...state.details,
          seasons: state.details.seasons.map(season => {
            if (season.id === action.season.id) {
              return action.season
              // there can be only one (current season)
            } else if (action.season.current && season.current) {
              return {...season, current: false}
            } else {
              return season
            }
          })
        }
      }

    case teamConstants.UPDATE_SEASON_FAILURE:
      return {
        details: {
          ...state.details
        }
      }


    case teamConstants.DESTROY_SEASON_REQUEST:
      return {
        ...state,
        destroySeasonFetch: true
      }

    case teamConstants.DESTROY_SEASON_SUCCESS:
      return {
        details: {
          ...state.details,
          seasons: state.details.seasons.filter(season => season.id !== action.seasonId)
        }
      }

    case teamConstants.DESTROY_SEASON_FAILURE:
      return {
        details: {
          ...state.details
        }
      }

    case teamConstants.CREATE_PLAYER_REQUEST:
      return {
        ...state,
        createPlayerFetch: true
      }

    case teamConstants.CREATE_PLAYER_SUCCESS:
      return {
        details: {
          ...state.details,
          players: [...state.details.players, action.player]
        }
      }

    case teamConstants.CREATE_PLAYER_FAILURE:
      return {
        details: state.details
      }


    case teamConstants.UPDATE_PLAYER_REQUEST:
      return {
        ...state,
        updatePlayerFetch: true
      }

    case teamConstants.UPDATE_PLAYER_SUCCESS:
      return {
        details: {
          ...state.details,
          players: state.details.players.map(player => player.id === action.player.id ? action.player : player)
        }
      }

    case teamConstants.UPDATE_PLAYER_FAILURE:
      return {
        details: {
          ...state.details
        }
      }

    case teamConstants.DESTROY_PLAYER_REQUEST:
      return {
        ...state,
        destroySeasonFetch: true
      }

    case teamConstants.DESTROY_PLAYER_SUCCESS:
      return {
        details: {
          ...state.details,
          players: state.details.players.filter(player => player.id !== action.playerId)
        }
      }

    case teamConstants.DESTROY_PLAYER_FAILURE:
      return {
        details: {
          ...state.details
        }
      }
    default:
      return state
  }
}