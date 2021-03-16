import React from 'react'

import { BackButton } from 'components/buttons'

const SeasonPageHeader = props => {
  return (
    <div className="mt-3 d-flex justify-content-center align-items-center">
      <BackButton
        to={`/teams/${props.team.id}`}
        title="Back to Team Page"
      />
      <h2 className="my-auto">{props.team.name} - {props.seasonName}</h2>
    </div>
    
  )
}

export default SeasonPageHeader