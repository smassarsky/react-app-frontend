import React from 'react'

import { GoalsTable } from './GoalsTable'
import { PenaltiesTable } from './PenaltiesTable'

const GameEvents = (props) => {
  return (
    <>
      <h3>Game Events</h3>
      <GoalsTable goals={props.goals} owner={props.owner} />
      <PenaltiesTable penalties={props.penalties} owner={props.owner} />
    </>
  )
}

export default GameEvents

