import React from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const DestroyGoal = props => {
  return (
    <Modal show={props.show} onHide={props.hide} centered="true">
      <Modal.Body className="text-center">
        {props.goal ? renderDetails() : null}
        <Button
          onClick={() => props.submit(props.goal.id)}
          className="mx-2"
          type="button"
          variant="danger"
          size="sm"
        >
          Destroy
        </Button>
        <Button
          onClick={props.hide}
          className="mx-2"
          type="button"
          variant="primary"
          size="sm"
        >
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  )

  function renderDetails() {
    return (
      <>
        <h2>Destroy Goal?</h2>
        <p>Team: {props.goal.team ? props.goal.team.name : props.opponent}</p>
        <p>Scorer: {props.goal.player ? props.goal.player.name : '-'}</p>
        <p>Period: {props.goal.period}</p>
        <p>Time: {props.goal.time}</p>
      </>
    )
  }
}

export default DestroyGoal