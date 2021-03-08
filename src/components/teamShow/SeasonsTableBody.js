import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const SeasonsTableBody = props => {
  return (
    <>
      { props.seasons.map(season => renderRow(season))}
    </>
  )

  function renderRow(season) {
    return <Row className="my-tbody">
      <Col>{season.name}{season.current ? " (Current)" : ""}</Col>
      <Col>{season.record}</Col>
      <Col>{season.nextGame}</Col>
      <Col>{season.lastGame}</Col>
      <Col>{renderActions(season)}</Col>
    </Row>
  }

  function renderActions(season) {
    return (
      <>
        <LinkContainer to={`/seasons/${season.id}`} >
          <Button size="sm" type="button">Show</Button>
        </LinkContainer>
        { props.owner ?
          <>
            <Button
              onClick={() => props.modals.edit(season)}
              className="ml-3"
              size="sm"
              type="button">
                Edit
            </Button>
            <Button
              onClick={() => props.modals.destroy(season)}
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

export default SeasonsTableBody