import React from 'react'

import Alerts from 'components/Alerts'

import { Header, THead, TBody } from './components'

const GamesTable = props => {
  return (
    <>
      <Header
        owner={props.owner}
        showNew={props.modals.new}
      />
      <Alerts />
      {props.games.length > 0 ? renderTable() : <h4>No Games Yet</h4>}
    </>
  )

  function renderTable() {
    return (
      <div className="my-table">
        <THead />
        <TBody
          games={props.games}
          showEdit={props.modals.edit}
          showDestroy={props.modals.destroy}
          owner={props.owner}
        />
      </div>
    )
  }
}

export default GamesTable