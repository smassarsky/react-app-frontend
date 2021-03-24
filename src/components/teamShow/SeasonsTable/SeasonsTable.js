import React from 'react'

import { Header, THead, TBody } from './components'

const SeasonsTable = props => {
  return(
    <>
      <Header
        owner={props.owner}
        showNew={props.modals.new}
      />
      {props.seasons.length > 0 ? renderTable() : <h4>No Seasons Yet</h4>}
    </>
  )

  function renderTable() {
    return (
      <div className="my-table">
        <THead />
        <TBody
          seasons={props.seasons}
          showEdit={props.modals.edit}
          showDestroy={props.modals.destroy}
          owner={props.owner}
        />
      </div>
    )

  }
}

export default SeasonsTable