import React, { Component } from 'react'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

class NewTeamModal extends Component {

  state = {
    name: ''
  }

  handleHide = () => {
    this.setState({name: ''})
    this.props.hideModal()
  }

  handleChange = e => {
    this.setState({name: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.createTeam(e.target.name.value)
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleHide} centered="true">
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Col>
                <Form.Label srOnly='true'>Name</Form.Label>
                <Form.Control onChange={this.handleChange} type="text" name="name" placeholder="Team Name"></Form.Control>
              </Col>
              <Button type="submit">Create Team</Button>
            </Form.Row>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }

}

export default NewTeamModal