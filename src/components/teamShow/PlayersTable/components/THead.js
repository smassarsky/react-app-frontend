import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const THead = props => {
  return (
    <Row className="my-thead">
      <Col>Name</Col>
      <Col>Position</Col>
      <Col>Jersey</Col>
      <Col>GP</Col>
      <Col>G</Col>
      <Col>A</Col>
      <Col>P</Col>
      <Col>Actions</Col>
    </Row>
  )

}

export default THead