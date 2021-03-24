import React, { Component } from 'react'

import Modal from 'react-bootstrap/Modal'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'

class ShowCodeModal extends Component {

  constructor(props) {
    super(props)
    this.playerCode = React.createRef()
  }

  handleCopy = e => {
    console.log(this.playerCode)
    this.playerCode.current.select()
    document.execCommand('copy')
    e.target.focus()
  }

  render() {
    console.log(this.props)
    return (
      <Modal show={this.props.show} onHide={this.props.hide} centered="true" >
        <Modal.Body>
          <h6>Copy this code and send it to {this.props.player ? this.props.player.name : null}</h6>
          <InputGroup>
            <FormControl
              type="text"
              readOnly={true}
              value={this.props.loading || !this.props.player ? "Loading..." : this.props.player.playerCode.code}
              ref={this.playerCode}
            />
            <InputGroup.Append>
              <Button
                type="button"
                variant="outline-secondary"
                onClick={this.handleCopy}
              >
                <FontAwesomeIcon icon={faClipboard} />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Modal.Body>
      </Modal>
    )
  }
}

export default ShowCodeModal