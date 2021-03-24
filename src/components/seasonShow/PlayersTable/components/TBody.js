import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { ShowButton } from 'components/buttons'

const TBody = props => {
  return (
    <>
      {props.players.map(player => renderRow(player))}
    </>
  )

  function renderRow(player) {
    return (
      <Row className="my-tbody">
        <Col>{player.name}</Col>
        <Col>{player.position}</Col>
        <Col>{player.jerseyNum}</Col>
        <Col>{player.stats.gamesPlayed}</Col>
        <Col>{player.stats.goals}</Col>
        <Col>{player.stats.assists}</Col>
        <Col>{player.stats.points}</Col>
        <Col>{player.stats.plusMinus}</Col>
        <Col>{player.stats.pim}</Col>
        <Col>
          <ShowButton
            to={`/players/${player.id}`}
            title="View Player"
          />
        </Col>
      </Row>
    )
  }
}

export default TBody