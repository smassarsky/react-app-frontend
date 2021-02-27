import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'





const TeamsTableBody = props => {
  console.log(props)
  return (
    <>
      { props.teams.map(team => renderRow(team, props.userId)) }
    </>
  )

  function renderRow(team) {
    console.log(team)
    return ( 
      <Row key={team.id} className="my-tbody">
        <Col>{team.name}</Col>
        <Col>{team.owner.name}</Col>
        <Col>{team.currentSeasonName}</Col>
        <Col>{team.currentRecord}</Col>
        <Col>{team.nextGame}</Col>
        <Col>{team.lastGame}</Col>
        <Col>{renderActions(team)}</Col>
      </Row>
    )
  }

  function renderActions(team) {
    return (
      <>
        <LinkContainer to={`/teams/${team.id}`} >
          <Button size="sm" type="button">Show</Button>
        </LinkContainer>
        {team.owner.id === props.userId ?  <>
                    <Button onClick={() => props.modals.edit(team)} className="ml-3" size="sm" type="button">Edit</Button>
                    <Button onClick={() => props.modals.destroy(team)} className="ml-3" variant="danger" size="sm" type="button">Delete</Button>
                  </> : null}
      </>
    )
  }
}

export default TeamsTableBody