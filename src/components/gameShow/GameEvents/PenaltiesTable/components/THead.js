import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const THead = (props) => {
  return (
    <Row className="my-thead">
      <Col>Period</Col>
      <Col>Time</Col>
      <Col>Team</Col>
      <Col>Player</Col>
      <Col>Infraction</Col>
      <Col>Length</Col>
      {props.owner ? <Col>Actions</Col> : null}
    </Row>
  )
}

export default THead