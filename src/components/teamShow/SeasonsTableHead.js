import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const SeasonsTableHead = props => {
  return (
    <Row className="my-thead">
      <Col>Name</Col>
      <Col>Record</Col>
      <Col>Next Game</Col>
      <Col>Last Game</Col>
      <Col>Actions</Col>
    </Row>
  )
}

export default SeasonsTableHead