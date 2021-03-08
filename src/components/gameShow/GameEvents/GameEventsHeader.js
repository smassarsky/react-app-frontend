import React from 'react'

import Button from 'react-bootstrap/Button'

const GameEventsHeader = props => {
  function renderButtons() {
    return (
      <>
        <Button
          className="mr-3"
          onClick={props.modalControls.showNewGoal}
          variant="primary"
          type="button"
          size="sm"
        >
          Add Goal
        </Button>
        <Button
          onClick={props.modalControls.showNewPenalty}
          variant="primary"
          type="button"
          size="sm"
        >
          Add Penalty
        </Button>
      </>
    )
  }

  return (
    <>
      <h3>Game Events</h3>
      { props.owner ? renderButtons() : null }
    </>
  )
}

export default GameEventsHeader