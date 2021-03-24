import React from 'react'

import { Header, THead, TBody } from './components'
import Alerts from 'components/Alerts'

const TeamsTable = props => {
  return (
    <>
      <Header
        new={props.modals.new}
        join={props.modals.join}
      />
      <Alerts />
      {props.teams.length > 0 ? renderTable() : <h4>No Teams Yet</h4>}
    </>
  )

  function renderTable() {
    return (
      <div className="my-table">
        <THead />
        <TBody
          teams={props.teams}
          edit={props.modals.edit}
          destroy={props.modals.destroy}
          userId={props.userId}
        />
      </div>
    )
  }
}

export default TeamsTable