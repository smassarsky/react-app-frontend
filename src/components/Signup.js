import React, { Component } from 'react'
import { connect } from 'react-redux'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Alerts from './Alerts'
import InputError from './InputError'

import { userActions } from '../actions/userActions'
import { validateSignup } from '../_validators/signupValidators'



class Signup extends Component {

  state = {
    username: '',
    password: '',
    passwordConfirmation: '',
    name: '',
    errors: {}
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const errors = validateSignup(this.state)
    this.setState({ errors })
    if (Object.keys(errors).length === 0) {
      this.props.signup(this.state)
    }
  }

  render() {
    return (
      <div className="h-100 login-styling">
        <Form onSubmit={this.handleSubmit} className="form-signin text-center">

          <h3 className="mb-3 font-weight-normal">Login</h3>

          <Alerts />

          <Form.Group controlId="formUsername">
            <Form.Label srOnly="true">Username</Form.Label>
            <Form.Control onChange={this.handleChange} type="text" name="username" placeholder="Username" value={this.state.username} />
            <InputError message={this.state.errors.username} />
          </Form.Group>

          <Form.Group controlId="formName">
            <Form.Label srOnly="true">Name</Form.Label>
            <Form.Control onChange={this.handleChange} type="text" name="name" placeholder="Name" value={this.state.name} />
            <InputError message={this.state.errors.name} />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label srOnly="true">Password</Form.Label>
            <Form.Control onChange={this.handleChange} type="password" name="password" placeholder="Password" value={this.state.password} />
            <InputError message={this.state.errors.password} />
          </Form.Group>

          <Form.Group controlId="formPasswordConfirmation">
            <Form.Label srOnly="true">Password Confirmation</Form.Label>
            <Form.Control onChange={this.handleChange} type="password" name="passwordConfirmation" placeholder="Password Confirmation" value={this.state.passwordConfirmation} />
            <InputError message={this.state.errors.passwordConfirmation} />
          </Form.Group>

          <Button variant="primary" type="submit">Signup</Button>

        </Form>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    signingUp: state.user.signingUp
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signup: fields => dispatch(userActions.signup(fields))
  }
}

export default connect(mapStateToProps ,mapDispatchToProps)(Signup)