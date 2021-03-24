import React from 'react'

import Col from 'react-bootstrap/Col'

import { THead, TBody } from './components'

const GoalsTable = (props) => {
  return (
    <Col className="mt-3">
      <h4>Goals</h4>
      { props.goals.length > 0 ? renderTable() : <h6>No Goals</h6>}
    </Col>
  )

  function renderTable() {
    return (
      <>
        <THead owner={props.owner}/>
        <TBody
          goals={props.goals}
          owner={props.owner}
          opponent={props.opponent}
          modalControls={props.modalControls}  
        />
      </>
    )

  }
}

export default GoalsTable