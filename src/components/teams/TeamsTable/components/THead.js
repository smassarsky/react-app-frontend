import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const TeamsTableHead = props => {
  return (
    <Row className="my-thead">
      <Col>Name</Col>
      <Col>Owner</Col>
      <Col>Current Season</Col>
      <Col>Current Record*</Col>
      <Col>Next Game</Col>
      <Col>Last Game</Col>
      <Col>Actions</Col>
    </Row>
  )
}

export default TeamsTableHead