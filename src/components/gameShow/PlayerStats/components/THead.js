import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const THead = props => {
  return (
    <Row className="my-thead">
      <Col>Name</Col>
      <Col>Position</Col>
      <Col>Jersey</Col>
      <Col>Goals</Col>
      <Col>Assists</Col>
      <Col>+ / -</Col>
      <Col>PIM</Col>
      { props.owner ? <Col>Actions</Col> : null }
    </Row>
  )
}

export default THead