import React from 'react'

import { dateParser, formatScore } from '../../config'

const GamePageHeader = (props) => {
  console.log(props.score, formatScore(props.score))
  return (
    <div className="my-3">
      <h2>{props.teamName} - {props.seasonName}</h2>
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