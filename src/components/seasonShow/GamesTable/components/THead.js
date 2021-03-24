import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const GamesTableHead = props => {
  return (
    <Row className="my-thead">
      <Col>Date / Time</Col>
      <Col>Place</Col>
      <Col>Opponent</Col>
      <Col>Score</Col>
      <Col>Status</Col>
      <Col>Actions</Col>
    </Row>
  )
}

export default GamesTableHead