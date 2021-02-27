import React from 'react'
import Button from 'react-bootstrap/Button'

const TeamPlayersHeader = props => {
  return (
    <div className="mb-3">
      <h3 className="my-3">Players</h3>
      {props.owner ? renderCreateButton() : null}
    </div>
  )

  function renderCreateButton() {
    return (
      <Button 
        onClick={props.showModal}
        variant="primary"
        type="button"
        size="sm">
          Create Player
      </Button>
    )
  }
}

export default TeamPlayersHeader