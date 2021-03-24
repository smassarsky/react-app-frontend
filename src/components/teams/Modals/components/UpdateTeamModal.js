import React, { Component } from 'react'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

class UpdateTeamModal extends Component {

  state = {
    name: ''
  }

  componentDidUpdate(prevProps) {
    if (prevProps.team !== this.props.team) {
      this.setState({name: this.props.team ? this.props.team.name : ''})
    }
  }

  handleHide = () => {
    this.setState({ name: '' })
    this.props.hide()
  }

  handleChange = e => {
    this.setState({name: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.action(this.state.name, this.props.team.id)
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleHide} centered="true">
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Col>
                <Form.Label srOnly='true'>Name</Form.Label>
                <Form.Control onChange={this.handleChange} type="text" name="name" placeholder="Team Name" value={this.state.name} ></Form.Control>
              </Col>

              <Button type="submit">Edit Team</Button>
            </Form.Row>
            

          </Form>
        </Modal.Body>

      </Modal>
    )
  }

}

export default UpdateTeamModal