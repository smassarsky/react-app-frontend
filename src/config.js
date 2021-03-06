const baseUrl = 'http://localhost:8000'

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
  console.log(dateStr)
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

export const formatScore = (scoreObj) => {
  console.log(scoreObj.opponent)
  return `${scoreObj.us} - ${scoreObj.opponent}${scoreObj.outcome ? scoreObj.outcome : '' }`
}