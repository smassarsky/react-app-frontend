import React from 'react'
import Button from 'react-bootstrap/Button'

const SeasonGamesHeader = props => {
  return (
    <div className="mb-3">
      <h3 className="my-3">Games</h3>
      {props.owner ? renderNewButton() : null}
    </div>
  )

  function renderNewButton() {
    return (
      <Button
        onClick={props.showNew}
        variant="primary"
        type="button"
        size="sm">
          Create Game
      </Button>
    )
  }
}

export default SeasonGamesHeader