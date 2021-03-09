import React from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const RemovePlayer = props => {
  return(
    <Modal show={props.show} onHide={props.hide} centered="true">
      <Modal.Body className="text-center">
        <h4>Remove {props.player.name}?</h4>
        <Button
          onClick={() => props.submit(props.player.id)}
          type="button"
          variant="danger"
          size="sm"
          className="mr-3"
        >
          Remove
        </Button>
        <Button
          onClick={props.hide}
          type="button"
          variant="primary"
          size="sm"
        >
          Cancel
        </Button>
      </Modal.Body>

    </Modal>
  )
}

export default RemovePlayer