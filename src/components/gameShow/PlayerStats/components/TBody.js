import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { DestroyButton } from 'components/buttons'

const TBody = props => {
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
        <Col>{player.stats.goals}</Col>
        <Col>{player.stats.assists}</Col>
        <Col>{player.stats.points}</Col>
        <Col>{player.stats.plusMinus}</Col>
        <Col>{player.stats.pim}</Col>
        { props.owner ? renderButtons(player) : null }
      </Row>
    )

    function renderButtons(player) {
      return (
        <Col>
          <DestroyButton
            action={() => props.showRemoveModal(player)}
            title="Remove Player"
          />
        </Col>
      )
    }
  }
}

export default TBody