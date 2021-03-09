import React from 'react'

import { NewGoal, EditGoal, DestroyGoal } from './Goals'
import { NewPenalty, EditPenalty, DestroyPenalty } from './Penalties'
import { AddPlayer, RemovePlayer } from './Players'

const Modals = props => {
  return (
    <>
      <NewGoal
        show={props.newGoal.show}
        hide={props.newGoal.hide}
        submit={props.newGoal.submit}
        players={props.players}
        team={props.team}
        opponent={props.opponent}
      />

      <EditGoal
        show={props.editGoal.show}
        hide={props.editGoal.hide}
        submit={props.editGoal.submit}
        players={props.players}
        opponent={props.opponent}
        goal={props.editGoal.goal}
      />

      <DestroyGoal
        show={props.destroyGoal.show}
        hide={props.destroyGoal.hide}
        submit={props.destroyGoal.submit}
        goal={props.destroyGoal.goal}
      />

      <NewPenalty
        show={props.newPenalty.show}
        hide={props.newPenalty.hide}
        submit={props.newPenalty.submit}
        players={props.players}
      />

      <EditPenalty
        show={props.editPenalty.show}
        hide={props.editPenalty.hide}
        submit={props.editPenalty.submit}
        players={props.players}
        penalty={props.penalty}
      />

      <DestroyPenalty
        show={props.destroyPenalty.show}
        hide={props.destroyPenalty.hide}
        submit={props.destroyPenalty.submit}
        penalty={props.penalty}
      />

      <AddPlayer
        show={props.addPlayer.show}
        hide={props.addPlayer.hide}
        submit={props.addPlayer.submit}
        roster={props.roster}
      />

      <RemovePlayer
        show={props.removePlayer.show}
        hide={props.removePlayer.hide}
        submit={props.removePlayer.submit}
        player={props.removePlayer.player}
      />
    </>
  )
}

export default Modals