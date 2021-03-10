import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const THead = (props) => {
  return (
    <Row className="my-thead">
      <Col>Period</Col>
      <Col>Time</Col>
      <Col>Team</Col>
      <Col>Scorer</Col>
      <Col>Assists</Col>
      <Col>On Ice</Col>
      {props.owner ? <Col>Actions</Col> : null}
    </Row>
  )
}

export default THead