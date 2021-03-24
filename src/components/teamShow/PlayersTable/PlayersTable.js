import React from 'react'

import { Header, THead, TBody } from './components'


const PlayersTable = props => {
  return(
    <>
      <Header
        owner={props.owner}
        showNew={props.modals.new}
      />
      {props.players.length > 0 ? renderTable() : <h4>No Players Yet</h4>}
    </>
  )

  function renderTable() {
    return (
      <div className="my-table">
        <THead />
        <TBody
          players={props.players}
          owner={props.owner}
          showEdit={props.modals.edit}
          showDestroy={props.modals.destroy}
          showCode={props.modals.code}
          createCode={props.createCode}
        />
      </div>
    )
  }
}

export default PlayersTable