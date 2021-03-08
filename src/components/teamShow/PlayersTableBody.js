import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const PlayersTableBody = props => {
  return (
    <>
      { props.players.map(player => renderRow(player))}
    </>
  )

  function renderRow(player) {
    return (
      <Row key={player.id} className="my-tbody">
        <Col>{player.name}</Col>
        <Col>{player.position}</Col>
        <Col>{player.jerseyNum}</Col>
        <Col>{player.stats.gamesPlayed}</Col>
        <Col>{player.stats.goals}</Col>
        <Col>{player.stats.assists}</Col>
        <Col>{player.stats.points}</Col>
        <Col>{renderActions(player)}</Col>
      </Row>
    )
  }

  function renderActions(player) {
    return(
      <>
        <LinkContainer to={`/players/${player.id}`} >
          <Button size="sm" type="button">Show</Button>
        </LinkContainer>
        {props.owner ? 
          <>
            <Button 
              onClick={() => props.modals.edit(player)}
              className="ml-3"
              size="sm"
              type="button">
                Edit
            </Button>
            <Button
              onClick={() => props.modals.destroy(player)}
              className="ml-3"
              variant="danger"
              size="sm"
              type="button">
                Delete
            </Button>
          </> : null
        }
      </>
    )
  }
}

export default PlayersTableBody