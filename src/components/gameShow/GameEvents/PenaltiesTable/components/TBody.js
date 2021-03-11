import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { periods } from '../../../../../config'

const TBody = (props) => {
  return (
    <>
      { props.penalties.map(penalty => renderRow(penalty))}
    </>
  )

  function renderRow(penalty) {
    return (
      <Row className="my-tbody">
        <Col>{periods[penalty.period]}</Col>
        <Col>{penalty.time}</Col>
        <Col>{penalty.team ? penalty.team.name : props.opponent}</Col>
        <Col>{penalty.player ? penalty.player.name : '-'}</Col>
        <Col>{penalty.infraction}</Col>
        <Col>{penalty.length}</Col>
        {props.owner ? renderActions(penalty) : null}
      </Row>
    )
  }

  function renderActions(penalty) {
    return (
      <Col>
        <Button
          onClick={() => props.modalControls.showEditPenalty(penalty)}
          className="mr-3"
          type="button"
          variant="primary"
          size="sm"
        >
          Edit
        </Button>
        <Button
          onClick={() => props.modalControls.showDestroyPenalty(penalty)}
          type="button"
          variant="danger"
          size="sm"
        >
          Remove
        </Button>
      </Col>
    )
  }
}

export default TBody