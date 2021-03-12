import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const THead = props => {
  return (
    <Row className="my-thead">
      <Col>Name</Col>
      <Col>Position</Col>
      <Col>Jersey</Col>
      <Col>Games Played</Col>
      <Col>Goals</Col>
      <Col>Assists</Col>
      <Col>Points</Col>
      <Col>+/-</Col>
      <Col>PIM</Col>
      <Col>Actions</Col>
    </Row>
  )
}

export default THead