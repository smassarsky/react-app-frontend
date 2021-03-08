import React from 'react'

import { GoalsTable } from './GoalsTable'
import { PenaltiesTable } from './PenaltiesTable'
import GameEventsHeader from './GameEventsHeader'

const GameEvents = (props) => {
  return (
    <div className="my-3">
      <GameEventsHeader modalControls={props.modalControls} owner={props.owner} />
      <GoalsTable goals={props.goals} owner={props.owner} />
      <PenaltiesTable penalties={props.penalties} owner={props.owner} />
    </div>
  )
}

export default GameEvents

