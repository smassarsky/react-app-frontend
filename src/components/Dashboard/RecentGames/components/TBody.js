import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { ShowButton } from 'components/buttons'

import { shortDate, formatScore } from 'config'

const TBody = props => {
  return (
    <>
      { props.games.map(game => renderRow(game)) }
    </>
  )

  function renderRow(game) {
    return (
      <Row className="my-tbody">
        <Col>{shortDate(game.datetime)}</Col>
        <Col>{`${game.team.name} (${game.team.owner.name})`}</Col>
        <Col>{game.opponent}</Col>
        <Col>{game.place}</Col>
        <Col>{formatScore(game.score)}</Col>
        <Col>
          <ShowButton
            to={`/games/${game.id}`}
            title="View Game"
          />
        </Col>
      </Row>
    )
  }
}

export default TBody