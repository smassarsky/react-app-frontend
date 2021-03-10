import React from 'react'

import { GoalsTable } from './GoalsTable'
import { PenaltiesTable } from './PenaltiesTable'
import GameEventsHeader from './GameEventsHeader'

const GameEvents = (props) => {
  return (
    <div className="my-3">

      <GameEventsHeader
        modalControls={ {
          showNewGoal: props.modalControls.showNewGoal,
          showNewPenalty: props.modalControls.showNewPenalty
        } }
        owner={props.owner}
      />

      <GoalsTable
        goals={props.goals}
        owner={props.owner}
        opponent={props.opponent}
        modalControls={ {
          showEditGoal: props.modalControls.showEditGoal,
          showDestroyGoal: props.modalControls.showDestroyGoal
        } }
      />

      <PenaltiesTable
        penalties={props.penalties}
        owner={props.owner}
        modalControls={ {
          showEditPenalty: props.modalControls.showEditPenalty,
          showDestroyPenalty: props.modalControls.showDestroyPenalty
        } }
      />

    </div>
  )
}

export default GameEvents

