import React from 'react'

import { BackButton } from 'components/buttons'

import { dateParser, formatScore } from '../../config'

const GamePageHeader = props => {
  console.log(props)
  return (
    <div className="my-3">
      <div className="mb-2 d-flex justify-content-center align-items-center">
        <BackButton to={`/seasons/${props.season.id}`} title="Back to Season" />
        <h2 className="my-auto">{props.teamName} - {props.season.name}</h2>
      </div>

      <h4>
        {dateParser(props.datetime) + " "}
        {props.place === "home" ? "Vs" : "At"} 
        {" " + props.opponent}
      </h4>
      <h4>{formatScore(props.score)}</h4>
      <h6>{props.status}</h6>
    </div>
  )
}

export default GamePageHeader