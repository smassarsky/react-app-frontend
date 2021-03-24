import React from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import { shortDate } from 'config'


const DestroyGameModal = props => {
  return (
    <Modal show={props.show} onHide={props.hide} centered="true">
      <Modal.Body className="text-center">
        {props.game ? <h3>Delete {shortDate(props.game.datetime)} vs. {props.game.opponent}?</h3> : null}
        <Button
          onClick={() => props.action(props.game.id)}
          className="mx-3"
          variant="danger"
          type="button">
            Delete
        </Button>
        <Button
          onClick={props.hide}
          className="mx-3"
          variant="primary"
          type="button">
            Cancel
        </Button>
      </Modal.Body>
    </Modal>
  )
}

export default DestroyGameModal