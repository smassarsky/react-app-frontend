import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const TBody = (props) => {
  return (
    <>
      { props.goals.map(goal => renderRow(goal))}
    </>
  )

  function renderRow(goal) {
    return (
      <Row className="my-tbody">
        <Col>{goal.period}</Col>
        <Col>{goal.time}</Col>
        <Col>{goal.team}</Col>
        <Col>{goal.scorer}</Col>
        <Col>{goal.assists.join(' ')}</Col>
      </Row>
    )
  }
}

export default TBody