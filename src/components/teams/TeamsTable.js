import React from 'react'
import TeamsTableHead from './TeamsTableHead'
import TeamRow from './TeamRow'

const renderRows = teams => {
  return (
      teams.map(team => <TeamRow key={team.id} team={team} />)
  )
}

const TeamsTable = (props) => {
  return (
    <div className="p-3">
      <TeamsTableHead />
      {props.teams.length > 0 ? renderRows(props.teams) : <h4 className="mt-3">No Teams Yet</h4>}
    </div>
  )
}

export default TeamsTable