import React, { Component } from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const DeleteTeamModal = props => {
  return (
    <Modal show={props.show} onHide={props.hideModal} centered="true" >
      <Modal.Body className="text-center">
        <h3>Delete {props.team ? props.team.name : ''}?</h3>
        <Button onClick={props.deleteTeam} className="mx-3" variant="danger" type="button">Delete</Button>
        <Button onClick={props.hideModal} className="mx-3" variant="primary" type="button">Cancel</Button>
      </Modal.Body>
    </Modal>
  )
}

export default DeleteTeamModal