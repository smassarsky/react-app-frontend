import React from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const DestroyPenalty = props => {
  console.log(props)
  return (
    <Modal show={props.show} onHide={props.hide} centered="true">
      <Modal.Body className="text-center">
        {props.penalty ? renderDetails() : null}
        <Button
          onClick={() => props.submit(props.penalty.id)}
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
        <h2>Destroy Penalty?</h2>
        <p>Team: {props.penalty.team ? props.penalty.team.name : props.opponent}</p>
        <p>Player: {props.penalty.player ? props.penalty.player.name : '-'}</p>
        <p>Period: {props.penalty.period}</p>
        <p>Time: {props.penalty.time}</p>
      </>
    )
  }

}

export default DestroyPenalty