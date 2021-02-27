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

export const playerValues = {
  newInitialState,
  playerPositions
}