import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { ShowButton, EditButton, DestroyButton } from 'components/buttons'

import { formatNextGame, formatLastGame, parseRecord } from 'config'





const TeamsTableBody = props => {
  return (
    <>
      { props.teams.map(team => renderRow(team, props.userId)) }
      <div>
        <small><i>* Record format: W - L - T - OTL</i></small>
      </div>
    </>
  )

  function renderRow(team) {
    console.log(team)
    return ( 
      <Row key={team.id} className="my-tbody">
        <Col>{team.name}</Col>
        <Col>{team.owner.name}</Col>
        <Col>{team.currentSeasonName}</Col>
        <Col>{parseRecord(team.currentRecord)}</Col>
        <Col>{formatNextGame(team.nextGame)}</Col>
        <Col>{formatLastGame(team.lastGame)}</Col>
        <Col>{renderActions(team)}</Col>
      </Row>
    )
  }

  function renderActions(team) {
    return (
      <>
        <ShowButton to={`/teams/${team.id}`} title="View Team" />
        {team.owner.id === props.userId ?
        <>
          <EditButton
            action={() => props.edit(team)}
            title="Edit Team"
          />
          <DestroyButton
            action={() => props.destroy(team)}
            title="Delete Team"
          />
        </> : null}
      </>
    )
  }
}

export default TeamsTableBody