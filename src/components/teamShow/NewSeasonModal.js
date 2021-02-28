import React, { Component } from 'react'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'



class NewSeasonModal extends Component {

  state = {
    name: '',
    current: false
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleCheck = e => {
    const switcher = { false: true, true: false }
    this.setState((pS) => {
      return {current: switcher[pS.current]}})
  }

  handleHide = () => {
    this.setState({name: '', current: false})
    this.props.hideModal()
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.createSeason(this.state)
    this.handleHide()
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleHide} centered="true">
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label srOnly='true'>Name</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  placeholder="Season Name"
                  value={this.state.name}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} className="align-self-center mb-0">
                <Form.Check
                  onChange={this.handleCheck}
                  label="Current Season"
                  checked={this.state.current}
                />
              </Form.Group>
              <Form.Group as={Col} className="mb-0">
                <Button type="submit" block>Create Season</Button>
              </Form.Group>
             
            </Form.Row>

          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

export default NewSeasonModal