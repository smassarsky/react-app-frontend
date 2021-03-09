import React, { Component } from 'react'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

class AddPlayer extends Component {

  state = {
    playerId: null
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleHide = () => {
    this.setState({ playerId: null })
    this.props.hide()
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.submit(this.state.playerId)
  }

  renderPlayers = () => {
    return (
      <>
        <option disabled>Active Players</option>
        {this.props.roster.active.map(player => this.renderPlayerOption(player))}
        <option disabled>Inactive Players</option>
        {this.props.roster.inactive.map(player => this.renderPlayerOption(player))}
      </>
    )
  }

  renderPlayerOption = (player) => <option key={player.id} value={player.id}>{player.name}</option>

  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.handleHide} centered="true">
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} xs={8} className="mb-0">
                  <Form.Label className="text-muted mb-0">
                    <small>Player</small>
                  </Form.Label>
                  <Form.Control
                    onChange={this.handleChange}
                    as="select"
                    name="playerId"
                    value={this.state.playerId}
                  >
                    <option value="null">Pick a player...</option>
                    {this.renderPlayers()}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} xs={4} className="mb-0 d-flex">
                  <Button type="submit" className="w-100 mt-auto">Add Player</Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default AddPlayer