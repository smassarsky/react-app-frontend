import React, { Component } from 'react'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import InputError from 'components/InputError'

import { playerCodeService } from '_services'
import { history } from '_helpers/history'

class JoinTeamModal extends Component {

  state = {
    code: '',
    playerCode: null,
    errors: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    playerCodeService.show(this.state.code)
      .then(
        (playerCode) => {
          console.log(playerCode)
          this.setState({ playerCode })
        },
        error => {
          this.setState({ errors: error })
        }
      )
  }

  handleJoin = e => {
    playerCodeService.link(this.state.playerCode.code)
      .then(
        () => {
          history.push(`/teams/${this.state.playerCode.team.id}`)
        },
        error => {
          this.setState({ errors: error })
        }
      )
  }

  handleHide = () => {
    this.setState({code: '', playerCode: null, errors: ''})
    this.props.hide()
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, errors: '' })
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleHide} centered="true">
        <Modal.Body className="text-center">
          <InputError message={this.state.errors} />
          {this.state.playerCode ? this.renderConfirmation() : this.renderInput()}
        </Modal.Body>
      </Modal>
    )
  }

  renderInput() {
    return (
      <Form onSubmit={this.handleSubmit} >
        <Form.Row>
          <Form.Group className="mb-0" as={Col} xs={8}>
            <Form.Label className="mb-0"><small>Player Code</small></Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="text"
              name="code"
              placeholder="Enter Code..."
              value={this.state.code}
            />
          </Form.Group>
          <Form.Group className="mb-0" as={Col} xs={4} >
            <Form.Label></Form.Label>
            <Button
              type="submit"
              variant="primary"
              className="mt-auto"
              block
            >
              Join
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    )
  }

  renderConfirmation() {
    return (
      <>
        <h3>Join {this.state.playerCode.team.name}</h3>
        <p>Owner Name: {this.state.playerCode.team.owner.name}</p>
        <p>Player Name: {this.state.playerCode.player.name}</p>
        <div>
          <Button
            className="mx-2"
            onClick={this.handleJoin}
          >
            Join
          </Button>
          <Button
            className="mx-2"
            onClick={this.handleHide}
          >
            Cancel
          </Button>
        </div>
      </>
    )
  }

}

export default JoinTeamModal