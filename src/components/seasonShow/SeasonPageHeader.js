import React from 'react'

const SeasonPageHeader = props => {
  return (
    <h2 className="mt-3">{props.teamName} - {props.seasonName}</h2>
  )
}

export default SeasonPageHeader