import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { ShowButton, EditButton, DestroyButton } from 'components/buttons'

import { dateParser } from 'config'

const GamesTableBody = props => {
  return (
    <>
      { props.games.map(game => renderRow(game))}
    </>
  )

  function renderRow(game) {
    return <Row className="my-tbody">
      <Col>{dateParser(game.datetime)}</Col>
      <Col>{game.place}</Col>
      <Col>{game.opponent}</Col>
      <Col>{game.score.us} - {game.score.opponent}{game.score.outcome ? ` ${game.score.outcome}` : null}</Col>
      <Col>{game.status}</Col>
      <Col>{renderActions(game)}</Col>
    </Row>
  }

  function renderActions(game) {
    return (
      <>
        <ShowButton
          to={`/games/${game.id}`}
          title="View Game"
        />
        { props.owner ? 
          <>
            <EditButton
              action={() => props.showEdit(game)}
              title="Edit Game"
            />
            <DestroyButton
              action={() => props.showDestroy(game)}
              title="Delete Game"
            />
          </> : null
        }
      </>
    )
  }
}

export default GamesTableBody