import React, { Component } from 'react'

import { playerValues } from 'config'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

class EditPlayerModal extends Component {

  // const editPlayerInitialState = {
  //   id: null,
  //   name: '',
  //   position: 'C',
  //   jerseyNum: 0,
  //   status: 'Active'
  // }

  state = {...playerValues.editPlayerInitialState}

  componentDidUpdate(prevProps) {
    if (prevProps.player !== this.props.player) {
      const { id, name, position, jerseyNum, status } = this.props.player || {...playerValues.editPlayerInitialState}
      this.setState({ id, name, position, jerseyNum, status })
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleHide = () => {
    this.setState({ ...playerValues.editPlayerInitialState })
    this.props.hide()
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.action({ ...this.state })
  }

  renderPositions = () => {
    return playerValues.playerPositions.map(position => <option value={position}>{position}</option>)
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleHide} centered="true">
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} xs={8}>
                <Form.Label srOnly="true">Name</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  placeholder="Player Name"
                  value={this.state.name}
                />
              </Form.Group>

              <Form.Group as={Col} xs={4}>
                <Form.Label srOnly="true">Status</Form.Label>
                <Form.Control
                  as="select"
                  onChange={this.handleChange}
                  name="status"
                  value={this.state.status}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Form.Control>                     
              </Form.Group>

            </Form.Row>

            <Form.Row>

              <Form.Group as={Col} xs={4} className="mb-0">
                <Form.Label srOnly="true">Position</Form.Label>
                <Form.Control
                  as="select"
                  onChange={this.handleChange}
                  name="position"
                  value={this.state.position}
                >
                  {this.renderPositions()}
                </Form.Control>                
              </Form.Group>

              <Form.Group as={Col} xs={4} className="mb-0">
                <Form.Label srOnly="true">Jersey Number</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  type="number"
                  name="jerseyNum"
                  placeholder="Jersey Number"
                  value={this.state.jerseyNum}
                  min='0'
                  max='99'
                />                
              </Form.Group>

              <Form.Group as={Col} xs={4} className="mb-0">
                <Button type="submit" block>Edit Player</Button>
              </Form.Group>

            </Form.Row>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }

}

export default EditPlayerModal