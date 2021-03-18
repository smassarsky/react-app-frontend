// const baseUrl = 'http://localhost:8000'
const baseUrl = 'https://polar-savannah-87773.herokuapp.com'

export const config = {
  baseUrl
}

const newInitialState = {
  name: '',
  position: 'C',
  jerseyNum: '',
  status: 'Active'
}

const playerPositions = ['C', 'RW', 'LW', 'D', 'G']

export const editPlayerInitialState = {
  id: null,
  name: '',
  position: 'C',
  jerseyNum: 0,
  status: 'Active'
}

export const playerValues = {
  newInitialState,
  editPlayerInitialState,
  playerPositions
}

export const editSeasonInitialState = {
  name: '',
  current: false,
  id: null
}

export const newGameInitialState = {
  opponent: '',
  status: 'TBP',
  place: 'Home',
  datetime: ''
}

export const editGameInitialState = {
  ...newGameInitialState,
  id: null
}

export const dateParser = (dateStr) => {
  const options = {
    weekday: 'short',
    month: 'numeric',
    year: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }

  return new Date(dateStr).toLocaleDateString(undefined, options)
}

export const shortDate = dateStr => {
  const options = {
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }
  return new Date(dateStr).toLocaleDateString(undefined, options)
}

export const formatScore = (scoreObj) => {
  return `${scoreObj.us} - ${scoreObj.opponent}${scoreObj.outcome ? ` ${scoreObj.outcome}` : '' }`
}

export const formatNextGame = game => {
  return game ? `${shortDate(game.datetime)} ${game.place === 'Home' ? 'vs' : 'at'} ${game.opponent}` : '-'
}

export const formatLastGame = game => {
  return game ? `${formatScore(game.score)} ${game.place === 'Home' ? 'vs' : 'at'} ${game.opponent}` : '-'
}

export const parseRecord = record => {
  return record ? `${record.w} - ${record.l} - ${record.t} - ${record.otl}` : '-'
}

export const periods = {
  1: '1st',
  2: '2nd',
  3: '3rd',
  4: 'OT',
  5: 'OT2',
  6: 'OT3',
  7: 'OT4',
  99: 'S/O'
}

export const newGoalInitialState = {
  player: {},
  assistPlayers: [],
  onIcePlayers: [],
  team: {},
  period: '1',
  minutes: 0,
  seconds: 0,
  errors: {}
}

export const editGoalInitialState = {
  goalId: null,
  player: {},
  assistPlayers: [],
  onIcePlayers: [],
  team: {},
  period: '1',
  minutes: 0,
  seconds: 0,
  errors: {}
}

export const newPenaltyInitialState = {
  player: {},
  team: {},
  period: '1',
  minutes: 0,
  seconds: 0,
  length: 0,
  infraction: ''
}

export const editPenaltyInitialState = {
  penaltyId: null,
  player: {},
  team: {},
  period: '1',
  minutes: 0,
  seconds: 0,
  length: 0,
  infraction: ''
}

export function sortEvents(events) {
  return events.sort((a, b) => {
    if (a.period > b.period) {
      return 1
    } else if (a.period < b.period) {
      return -1
    } else {
      if (a.time > b.time) {
        return 1
      } else if (a.time < b.time) {
        return -1
      } else {
        return 0
      }
    }
  })
}