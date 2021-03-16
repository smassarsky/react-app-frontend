import React from 'react'

import { BackButton } from 'components/buttons'

const TeamPageHeader = props => {
  return (
    <div className="my-3 d-flex justify-content-center align-items-center">
      <BackButton
        to={"/teams"}
        title="Back to Teams Page"
      />
      <h2 className="my-auto">{props.teamName}</h2>
    </div>
    
  )
}

export default TeamPageHeader