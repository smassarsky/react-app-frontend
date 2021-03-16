import React from 'react'
import Button from 'react-bootstrap/Button'

import { BackButton } from 'components/buttons'

const TeamsHeader = props => {
  return (
    <div className="mb-3">
      <div className="my-3 d-flex justify-content-center align-items-center">
        <BackButton
          to="/dashboard"
          title="Back to Dashboard"
        />
        <h2 className="my-auto">Your Teams</h2>
      </div>
      
      <Button onClick={props.showNewModal} variant="primary" type="button" size="sm" className="mr-3">Create Team</Button>
      <Button variant="primary" type="button" size="sm">Join Team</Button>
    </div>
  )
}

export default TeamsHeader