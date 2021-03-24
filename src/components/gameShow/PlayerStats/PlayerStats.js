import React from 'react'

import { Header, THead, TBody } from './components'

const PlayerStats = props => {
  return (
    <div className="pb-3">
      <Header
        owner={props.owner}
        showAddModal={props.showModals.add}
      />
      {props.players.length > 0 ? renderTable() : <h5>No Players Attending Yet</h5>}
    </div>
  )

  function renderTable() {
    return (
      <>
        <THead
          owner={props.owner}
        />
        <TBody
          owner={props.owner}
          players={props.players}
          showRemoveModal={props.showModals.remove}
        />
      </>
    )
  }
}

export default PlayerStats