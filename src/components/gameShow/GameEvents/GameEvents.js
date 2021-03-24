import React from 'react'

import Row from 'react-bootstrap/Row'

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
      
      <Row>
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
          opponent={props.opponent}
          modalControls={ {
            showEditPenalty: props.modalControls.showEditPenalty,
            showDestroyPenalty: props.modalControls.showDestroyPenalty
          } }
        />
      </Row>

    </div>
  )
}

export default GameEvents

