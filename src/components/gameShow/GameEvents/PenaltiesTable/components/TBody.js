import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { EditButton, DestroyButton } from 'components/buttons'

import { periods } from 'config'

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
        <EditButton
          action={() => props.modalControls.showEditPenalty(penalty)}
          title="Edit Penalty"
        />
        <DestroyButton
          action={() => props.modalControls.showDestroyPenalty(penalty)}
          title="Delete Penalty"
        />
      </Col>
    )
  }
}

export default TBody