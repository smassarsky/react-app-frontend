import React from 'react'

import GamesTableHead from './GamesTableHead'
import GamesTableBody from './GamesTableBody'

const GamesTable = props => {
  return (
    <div className="my-table">
      <GamesTableHead />
      <GamesTableBody
        games={props.games}
        modals={props.modals}
        owner={props.owner}
      />
    </div>
  )
}

export default GamesTable