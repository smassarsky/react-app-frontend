import React, { Component } from 'react'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

class EditSeasonModal extends Component {

  state = {
    name: ''
  }

  componentDidUpdate(prevProps) {
    if (prevProps.season !== this.props.season) {
      this.setState({name: this.props.season ? this.props.season.name : ''})
    }
  }

  handleHide = () => {
    this.setState({ name: '' })
    this.props.hideModal()
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.updateSeason(this.state.name)
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleHide} centered="true">
        <Modal.Body>
          <Form onSubmit={this.props.handleUpdateSeason} >
            <Form.Row>
              <Col>
                <Form.Label srOnly="true">Name</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  placeholder="Season Name"
                  value={this.state.name}
                />
              </Col>
              <Button type="submit">Update Season</Button>
            </Form.Row>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }

}

export default EditSeasonModal