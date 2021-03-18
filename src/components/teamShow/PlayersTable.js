import React from 'react'

import PlayersTableHead from './PlayersTableHead'
import PlayersTableBody from './PlayersTableBody'

const PlayersTable = props => {
  return(
    <div className="my-table">
      <PlayersTableHead />
      <PlayersTableBody players={props.players} modals={props.modals} owner={props.owner} createCode={props.createCode} />
    </div>
  )
}

export default PlayersTable