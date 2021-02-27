import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const PlayersTableHead = props => {
  return (
    <Row className="my-thead">
      <Col>Name</Col>
      <Col>Position</Col>
      <Col>Jersey Number</Col>
      <Col>Games Played</Col>
      <Col>Goals</Col>
      <Col>Assists</Col>
      <Col>Points</Col>
      <Col>Actions</Col>
    </Row>
  )

}

export default PlayersTableHead