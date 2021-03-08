import React from 'react'

import Button from 'react-bootstrap/Button'

const Header = props => {
  return (
    <div className="mb-3">
      <h3>Players</h3>
      { props.owner ? renderButton() : null }
    </div>
  )

  function renderButton() {
    return (
      <Button
        onClick={props.showAddModal}
        variant="primary"
        type="button"
        size="sm"
      >
        Add Player
      </Button>
    )
  }
}

export default Header