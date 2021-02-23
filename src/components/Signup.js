import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



class Signup extends Component {

  state = {
    username: '',
    password: '',
    passwordConfirmation: '',
    name: '',
    errors: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

  }

  render() {
    return (
      <div className="h-100 login-styling">
        <Form onSubmit={this.handleSubmit} className="form-signin text-center">

          <h3 className="mb-3 font-weight-normal">Login</h3>

          <div id="error-div" className="text-danger mb-3">{this.state.errors}</div>

          <Form.Group controlId="formUsername">
            <Form.Label srOnly="true">Username</Form.Label>
            <Form.Control onChange={this.handleChange} type="text" name="username" placeholder="Username" value={this.state.username} />
          </Form.Group>

          <Form.Group controlId="formName">
            <Form.Label srOnly="true">Name</Form.Label>
            <Form.Control onChange={this.handleChange} type="text" name="name" placeholder="Name" value={this.state.name} />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label srOnly="true">Password</Form.Label>
            <Form.Control onChange={this.handleChange} type="password" name="password" placeholder="Password" value={this.state.password} />
          </Form.Group>

          <Form.Group controlId="formPasswordConfirmation">
            <Form.Label srOnly="true">Password Confirmation</Form.Label>
            <Form.Control onChange={this.handleChange} type="password" name="passwordConfirmation" placeholder="Password Confirmation" value={this.state.passwordConfirmation} />
          </Form.Group>

          <Button variant="primary" type="submit">Signup</Button>

        </Form>
      </div>
    )
  }

}

export default Signup