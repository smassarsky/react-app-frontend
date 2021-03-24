import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const THead = props => {
  return (
    <Row className="my-thead">
      <Col>Date/Time</Col>
      <Col>Team (owner)</Col>
      <Col>Opponent</Col>
      <Col>Place</Col>
      <Col>Actions</Col>
    </Row>
  )
}

export default THead