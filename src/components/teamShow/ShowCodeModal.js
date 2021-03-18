import React from 'react'

import Modal from 'react-bootstrap/Modal'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'

const ShowCodeModal = props => {
  console.log(props)
  return (
    <Modal show={props.show} onHide={props.hideModal} centered="true" >
      <Modal.Body>
        <h6>Copy this code and send it to {props.player ? props.player.name : null}</h6>
        <InputGroup>
          <FormControl
            type="text"
            readOnly={true}
            value={props.loading || !props.player ? "Loading..." : props.player.playerCode.code}
          />
          <InputGroup.Append>
            <Button
              type="button"
              variant="outline-secondary"
              onClick={handleCopy}
            >
              <FontAwesomeIcon icon={faClipboard} />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Modal.Body>
    </Modal>
  )

  function handleCopy() {
    navigator.clipboard.writeText(props.player.playerCode.code)
  }
}

export default ShowCodeModal