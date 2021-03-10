import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { periods } from '../../../../../config'

const TBody = (props) => {
  return (
    <>
      { props.goals.map(goal => renderRow(goal))}
    </>
  )

  function renderRow(goal) {
    return (
      <Row className="my-tbody">
        <Col>{periods[goal.period]}</Col>
        <Col>{goal.time}</Col>
        <Col>{goal.team ? goal.team.name : props.opponent}</Col>
        <Col>{goal.player ? goal.player.name : '-'}</Col>
        <Col>{goal.assistPlayers.length > 0 ? goal.assistPlayers.map(player => player.name).join(' ') : '-'}</Col>
        <Col>{goal.onIcePlayers.length > 0 ? goal.onIcePlayers.map(player => player.name).join(' ') : '-'}</Col>
        {props.owner ? renderDestroyGoalButton(goal) : null}
      </Row>
    )
  }

  function renderDestroyGoalButton(goal) {
    return (
      <Col>
        <Button
          onClick={() => props.modalControls.showEditGoal(goal)}
          className="mr-3"
          type="button"
          variant="primary"
          size="sm"
        >
          Edit
        </Button>
        <Button
          onClick={() => props.modalControls.showDestroyGoal(goal)}
          type="button"
          variant="danger"
          size="sm"
        >
          Remove
        </Button>      
      </Col>
    )

  }
}

export default TBody