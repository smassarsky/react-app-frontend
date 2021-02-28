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