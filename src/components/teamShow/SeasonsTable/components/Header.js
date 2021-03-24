import React from 'react'
import Button from 'react-bootstrap/Button'

const TeamSeasonsHeader = props => {
  return (
    <div className="mb-3">
      <h3 className="my-3">Seasons</h3>
      {props.owner ? renderCreateButton() : null}
    </div>
  )

  function renderCreateButton() {
    return (
      <Button 
        onClick={props.showNew}
        variant="primary"
        type="button"
        size="sm">
          Create Season
      </Button>
    )
  }
}

export default TeamSeasonsHeader