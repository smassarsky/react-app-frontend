import React, { Component } from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'


const DestroyGameModal = props => {
  return (
    <Modal show={props.show} onHide={props.hideModal} centered="true">
      <Modal.Body className="text-center">
        {props.game ? <h3>Delete {props.game.datetime} vs. {props.game.opponent}?</h3> : null}
        <Button
          onClick={() => props.destroyGame(props.game.id)}
          className="mx-3"
          variant="danger"
          type="button">
            Delete
        </Button>
        <Button
          onClick={props.hideModal}
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