import React from 'react'
import Button from 'react-bootstrap/Button'

const TeamsHeader = props => {
  return (
    <div className="mb-3">
      <h2 className="my-3">Your Teams</h2>
      <Button onClick={props.showNewModal} variant="primary" type="button" size="sm" className="mr-3">Create Team</Button>
      <Button variant="primary" type="button" size="sm">Join Team</Button>
    </div>
  )
}

export default TeamsHeader