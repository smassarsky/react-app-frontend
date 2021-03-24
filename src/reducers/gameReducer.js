import { gameConstants } from '../constants'
import { sortEvents } from 'config'

const initialState = {
  details: {
    events: {
      goals: [],
      penalties: []
    },
    playersList: [],
    score: {},
    team: {
      id: null,
      name: null,
      roster: { active: [], inactive: [] }
    },
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

      const newScore = {
        us: action.goal.team ? state.details.score.us + 1 : state.details.score.us,
        opponent: action.goal.team ? state.details.score.opponent : state.details.score.opponent + 1
      }

      const newEvents = {
        ...state.details.events,
        goals: sortEvents([...state.details.events.goals, action.goal])
      }

      let newPlayersList = {}

      let plusMinusIds = action.goal.onIcePlayers ? action.goal.onIcePlayers.map(player => player.id) : null

      if (action.goal.team) {
        let assistIds = action.goal.assistPlayers.map(player => player.id)
        
        newPlayersList = state.details.playersList.map(player => {
          const { goals, assists, plusMinus, points } = player.stats
          let newPlayerStats = { ...player.stats }

          if (action.goal.player.id === player.id) {
            newPlayerStats.goals = goals + 1
            newPlayerStats.points = points + 1
            newPlayerStats.plusMinus = plusMinus + 1
          } else if (assistIds.includes(player.id)) {
            newPlayerStats.assists = assists + 1
            newPlayerStats.points = points + 1
            newPlayerStats.plusMinus = plusMinus + 1
          } else if (plusMinusIds.includes(player.id)) {
            newPlayerStats.plusMinus = plusMinus + 1
          }

          return { ...player, stats: newPlayerStats}
        })
      } else {
        newPlayersList = state.details.playersList.map(player => {
          const { plusMinus } = player.stats
          let newPlayerStats = { ...player.stats }

          if (plusMinusIds.includes(player.id)) {
            newPlayerStats.plusMinus = plusMinus - 1
          }
          return { ...player, stats: newPlayerStats }
        })
      }

      return {
        details: {
          ...state.details,
          score: newScore,
          events: newEvents,
          playersList: newPlayersList
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

      const prevGoal = state.details.events.goals.find(goal => goal.id === action.goal.id)



      let updateGoalNewScore = {
        us: prevGoal.team ? state.details.score.us - 1 : state.details.score.us,
        opponent: prevGoal.team ? state.details.score.opponent : state.details.score.opponent - 1
      }

      updateGoalNewScore = {
        us: action.goal.team ? updateGoalNewScore.us + 1 : updateGoalNewScore.us,
        opponent: action.goal.team ? updateGoalNewScore.opponent : updateGoalNewScore.opponent + 1
      }

      const updateGoalNewEvents = {
        ...state.details.events,
        goals: sortEvents(state.details.events.goals.map(goal => goal.id === action.goal.id ? action.goal : goal))
      }

      const oldPlusMinusIds = prevGoal.onIcePlayers.map(player => player.id)
      const newPlusMinusIds = action.goal.onIcePlayers.map(player => player.id)

      let updateGoalPlayersList = {}
        
      if (prevGoal.team) {
        let assistIds = prevGoal.assistPlayers.map(player => player.id)
        updateGoalPlayersList = state.details.playersList.map(player => {
          const { goals, assists, plusMinus, points } = player.stats
          let updatePlayerStats = { ...player.stats }

          if (prevGoal.player.id === player.id) {
            updatePlayerStats.goals = goals - 1
            updatePlayerStats.points = points - 1
            updatePlayerStats.plusMinus = plusMinus - 1
          } else if (assistIds.includes(player.id)) {
            updatePlayerStats.assists = assists - 1
            updatePlayerStats.points = points - 1
            updatePlayerStats.plusMinus = plusMinus - 1
          } else if (oldPlusMinusIds.includes(player.id)) {
            updatePlayerStats.plusMinus = plusMinus - 1
          }

          return { ...player, stats: updatePlayerStats }
        })
      } else {
        updateGoalPlayersList = state.details.playersList.map(player => {
          const { plusMinus } = player.stats
          let updatePlayerStats = { ...player.stats }

          if (oldPlusMinusIds.includes(player.id)) {
            updatePlayerStats.plusMinus = plusMinus + 1
          }
          return { ...player, stats: updatePlayerStats }
        })
      }

      if (action.goal.team) {
        let assistIds = action.goal.assistPlayers.map(player => player.id)

        updateGoalPlayersList = updateGoalPlayersList.map(player => {
          const { goals, assists, plusMinus, points } = player.stats
          let updatePlayerStats = { ...player.stats }

          if (action.goal.player.id === player.id) {
            updatePlayerStats.goals = goals + 1
            updatePlayerStats.points = points + 1
            updatePlayerStats.plusMinus = plusMinus + 1
          } else if (assistIds.includes(player.id)) {
            updatePlayerStats.assists = assists + 1
            updatePlayerStats.points = points + 1
            updatePlayerStats.plusMinus = plusMinus + 1
          } else if (newPlusMinusIds.includes(player.id)) {
            updatePlayerStats.plusMinus = plusMinus + 1
          }
          return { ...player, stats: updatePlayerStats }
        })
      } else {
        updateGoalPlayersList = updateGoalPlayersList.map(player => {
          const { plusMinus } = player.stats
          let updatePlayerStats = { ...player.stats }

          if (newPlusMinusIds.includes(player.id)) {
            updatePlayerStats.plusMinus = plusMinus -1
          }
          return { ...player, stats: updatePlayerStats }
        })
      }

      return {
        details: {
          ...state.details,
          score: updateGoalNewScore,
          events: updateGoalNewEvents,
          playersList: updateGoalPlayersList
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
      const goalToBeDestroyed = state.details.events.goals.find(goal => goal.id === action.goalId)

      const destroyNewScore = {
        us: goalToBeDestroyed.team ? state.details.score.us - 1 : state.details.score.us,
        opponent: goalToBeDestroyed.team ? state.details.score.opponent : state.details.score.opponent - 1
      }

      const destroyGoalNewEvents = {
        ...state.details.events,
        goals: state.details.events.goals.filter(goal => goal.id !== action.goalId)
      }

      let destroyPlusMinusIds = goalToBeDestroyed.onIcePlayers.map(player => player.id)
      let destroyNewPlayersList = {}

      if (goalToBeDestroyed.team) {
        const assistIds = goalToBeDestroyed.assistPlayers.map(player => player.id)

        destroyNewPlayersList = state.details.playersList.map(player => {
          const { goals, assists, plusMinus, points } = player.stats
          let newPlayerStats = { ...player.stats }

          if (goalToBeDestroyed.player.id === player.id) {
            newPlayerStats.goals = goals - 1
            newPlayerStats.points = points - 1
            newPlayerStats.plusMinus = plusMinus - 1
          } else if (assistIds.includes(player.id)) {
            newPlayerStats.assists = assists - 1
            newPlayerStats.points = points - 1
            newPlayerStats.plusMinus = plusMinus - 1
          } else if (destroyPlusMinusIds.includes(player.id)) {
            newPlayerStats.plusMinus = plusMinus - 1
          }
          return { ...player, stats: newPlayerStats }
        })
      } else {
        destroyNewPlayersList = state.details.playersList.map(player => {
          const { plusMinus } = player.stats
          let newPlayerStats = { ...player.stats }
          if (destroyPlusMinusIds.includes(player.id)) {
            newPlayerStats.plusMinus = plusMinus + 1
          }
          return { ...player, stats: newPlayerStats}
        })
      }

      return {
        details: {
          ...state.details,
          score: destroyNewScore,
          events: destroyGoalNewEvents,
          playersList: destroyNewPlayersList
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

      const newPenaltyEvents = {
        ...state.details.events,
        penalties: sortEvents([...state.details.events.penalties, action.penalty])
      }
      
      let newPenaltyPlayersList = {}
      
      if (action.penalty.team) {
        newPenaltyPlayersList = state.details.playersList.map(player => {
          if (action.penalty.player.id === player.id) {
            return {
              ...player,
              stats: {
                ...player.stats,
                pim: player.stats.pim + action.penalty.length
              }
            }
          } else {
            return player
          }
        })
      } else {
        newPenaltyPlayersList = state.details.playersList
      }

      return {
        details: {
          ...state.details,
          events: newPenaltyEvents,
          playersList: newPenaltyPlayersList
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

      const penaltyToUpdate = state.details.events.penalties.find(penalty => penalty.id === action.penalty.id)

      const updatePenaltyEvents = {
        ...state.details.events,
        penalties: sortEvents(state.details.events.penalties.map(penalty => penalty.id === action.penalty.id ? action.penalty : penalty))
      }

      let updatePenaltyPlayersList = {}

      if (action.penalty.team || penaltyToUpdate.team) {
        updatePenaltyPlayersList = state.details.playersList.map(player => {
          let updatePlayerPim = player.stats.pim
          console.log(player, updatePlayerPim)
          if (penaltyToUpdate.player && penaltyToUpdate.player.id === player.id) {
            updatePlayerPim -= penaltyToUpdate.length
          }
          if (action.penalty.player && action.penalty.player.id === player.id) {
            updatePlayerPim += action.penalty.length
          }
          return {
            ...player,
            stats: {
              ...player.stats,
              pim: updatePlayerPim
            }
          }
        })
      } else {
        updatePenaltyPlayersList = state.details.playersList
      }

      return {
        details: {
          ...state.details,
          events: updatePenaltyEvents,
          playersList: updatePenaltyPlayersList
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

      const penaltyToDestroy = state.details.events.penalties.find(penalty => penalty.id === action.penaltyId)

      const destroyPenaltyEvents = {
        ...state.details.events,
        penalties: state.details.events.penalties.filter(penalty => penalty.id !== action.penaltyId)
      }

      let destroyPenaltyPlayersList = {}

      if (penaltyToDestroy.team) {
        destroyPenaltyPlayersList = state.details.playersList.map(player => {
          if (penaltyToDestroy.player.id === player.id) {
            return {
              ...player,
              stats: {
                ...player.stats,
                pim: player.stats.pim - penaltyToDestroy.length
              }
            }
          } else {
            return player
          }
        })
      } else {
        destroyPenaltyPlayersList = state.details.playersList
      }

      return {
        details: {
          ...state.details,
          events: destroyPenaltyEvents,
          playersList: destroyPenaltyPlayersList
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