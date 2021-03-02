import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const GamesTableBody = props => {
  console.log(props)
  return (
    <>
      { props.games.map(game => renderRow(game))}
    </>
  )

  function renderRow(game) {
    return <Row className="my-tbody">
      <Col>{game.datetime}</Col>
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
        <LinkContainer to={`/games/${game.id}`} >
          <Button size="sm" type="button">Show</Button>
        </LinkContainer>
        { props.owner ? 
          <>
            <Button
              onClick={() => props.modals.edit(game)}
              className="ml-3"
              size="sm"
              type="button">
                Edit
            </Button>
            <Button
              onClick={() => props.modals.destroy(game)}
              className="ml-3"
              variant="danger"
              size="sm"
              typ="button">
                Delete
            </Button>
          </> : null
        }
      </>
    )
  }
}

export default GamesTableBody