import React from 'react'
import Button from 'react-bootstrap/Button'

const Header = props => {
  return (
    <div className="mb-3">
      <h3 className="my-3">Players</h3>
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
          Create Player
      </Button>
    )
  }
}

export default Header