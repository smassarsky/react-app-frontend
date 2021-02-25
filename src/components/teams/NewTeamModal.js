import React from 'react'

import Modal from 'react-bootstrap/Modal'

const NewTeamModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.hideModal} closeButton>
      <Modal.Header closeButton>
        <Modal.Title>New Team</Modal.Title>
      </Modal.Header>
    </Modal>
  )
}

export default NewTeamModal