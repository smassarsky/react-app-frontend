import React, { Component } from 'react'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

import { newGameInitialState } from '../../config'


class NewGameModal extends Component {

  state = newGameInitialState

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleHide = () => {
    this.setState({...newGameInitialState})
    this.props.hideModal()
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.createGame(this.state)
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleHide} centered="true">
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} xs={8} className="mb-0">
                <Form.Label className="text-muted mb-0"><small>Date & Time</small></Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  type="datetime-local"
                  name="datetime"
                  value={this.state.datetime}
                />
              </Form.Group>
              <Form.Group as={Col} xs={4} className="mb-0">
                <Form.Label className="text-muted mb-0"><small>Home or Away</small></Form.Label>
                <Form.Control
                  as="select"
                  name="place"
                  onChange={this.handleChange}
                  value={this.state.place}
                >
                  <option value="Home">Home</option>
                  <option value="Away">Away</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} xs={8}>
                <Form.Label className="text-muted mb-0"><small>Opponent</small></Form.Label>
                <Form.Control
                  type="text"
                  name="opponent"
                  onChange={this.handleChange}
                  value={this.state.opponent}
                />
              </Form.Group>
              <Form.Group as={Col} xs={4}>
                <Form.Label className="text-muted mb-0"><small>Status</small></Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  onChange={this.handleChange}
                  value={this.state.status}
                >
                  <option value="TBP">TBP</option>
                  <option value="Final">Final</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row className="justify-content-center">
              <Form.Group as={Col} xs={4} className="mb-0">
                <Button type="submit" block>Create Game</Button>
              </Form.Group>
            </Form.Row>
          </Form>

        </Modal.Body>
      </Modal>
    )
  }

}

export default NewGameModal