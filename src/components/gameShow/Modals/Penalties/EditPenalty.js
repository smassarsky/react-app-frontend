import React, { Component } from 'react'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { penaltyValidations } from '../../../../_validators/penaltyValidators'

import { periods, editPenaltyInitialState } from '../../../../config'

class EditPenalty extends Component {

  state = editPenaltyInitialState

  componentDidUpdate(prevProps) {
    console.log(prevProps, this.props, prevProps === this.props)
    if (this.props.penalty && this.state.penaltyId !== this.props.penalty.id) {
      console.log('hi again')
      const { period, time, infraction, length } = this.props.penalty
      const player = this.props.penalty.player || {}
      const team = this.props.penalty.team || {}
      const penaltyId = this.props.penalty.id
      const [minutes, seconds] = time.split(':')
      this.setState( this.props.goal ? { penaltyId, player, team, period, minutes, seconds, infraction, length } : editPenaltyInitialState)
    }
  }

  handleUpdateTime = e => {
    this.setState((pS) => {
      return penaltyValidations.setTime(pS, e)
    })
  }

  handleSetPlayer = e => {
    if (e.target.value !== '') {
      const playerId = parseInt(e.target.value)
      this.setState((pS) => penaltyValidations.setPlayer(pS, playerId, this.props.players))
    }
  }

  handleSetTeam = e => {
    this.setState((pS) => penaltyValidations.setTeam(pS, e.target.value, this.props.team))
  }

  handleSetPeriod = e => {
    this.setState({ period: e.target.value })
  }

  handleSetLength = e => {
    this.setState(penaltyValidations.setLength(e))
  }

  handleSetInfraction = e => {
    this.setState({ infraction: e.target.value })
  }

  renderTeams = () => {
    return (
      <>
        <option value=''>{this.props.opponent}</option>
        <option value={this.props.team.id}>{this.props.team.name}</option>
      </>
    )
  }

  renderPeriodOptions = () => {
    let out = []
    for (const key in periods) {
      out.push(<option key={`period-${key}`} value={key}>{periods[key]}</option>)
    }
    return out
  }

  renderOptions = () => {
    return (
      <>
        <option key={0} value=''>Pick a player...</option>
        {this.props.players.map(player => this.renderPlayerOption(player))}
      </>
    )
  }

  renderPlayerOption = player => <option key={player.id} value={player.id}>{player.name}</option>

  handleSubmit = e => {
    e.preventDefault()
    this.props.submit(this.state)
    this.setState(editPenaltyInitialState)
  }

  handleHide = () => {
    this.setState(editPenaltyInitialState)
    this.props.hide()
  }

  render() {
    console.log(this.state)
    return (
      <Modal show={this.props.show} onHide={this.handleHide} centered="true">
        <Modal.Body>
          <Form onSubmit={this.handleSubmit} >

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label className="text-muted mb-0">
                  <small>Team</small> 
                </Form.Label>
                <Form.Control
                  onChange={this.handleSetTeam}
                  as="select"
                  name="team"
                  value={this.state.team.id}
                >
                  {this.renderTeams()}
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} xs={5}>
                <Form.Label className="text-muted mb-0">
                  <small>Period</small>
                </Form.Label>
                <Form.Control
                  onChange={this.handleSetPeriod}
                  as="select"
                  name="period"
                  value={this.state.period}
                >
                  {this.renderPeriodOptions()}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} xs={3} className="pr-0">
                <Form.Label className="text-muted mb-0">
                  <small>Min</small>
                </Form.Label>
                <Form.Control
                  onChange={this.handleUpdateTime}
                  className="text-center time-setter-minutes"
                  type="number"
                  name="minutes"
                  value={this.state.minutes}
                />
              </Form.Group>
              <Form.Group as={Col} xs={1} className="px-0">
                <Form.Label></Form.Label>
                <Form.Control readOnly={true} value=':' type="text" className="time-setter-middle text-center" />
              </Form.Group>            
              
              <Form.Group as={Col} xs={3} className="pl-0">
                <Form.Label className="text-muted mb-0">
                  <small>Sec</small>
                </Form.Label>
                <Form.Control
                  onChange={this.handleUpdateTime}
                  className="text-center time-setter-seconds"
                  type="number"
                  name="seconds"
                  value={this.state.seconds}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label className="text-muted mb-0">
                  <small>Player</small>
                </Form.Label>
                <Form.Control
                  onChange={this.handleSetPlayer}
                  as="select"
                  name="player"
                  value={this.state.player.id}
                  disabled={this.state.team.id ? false : true}
                >
                  {this.renderOptions()}
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} xs={6}>
                <Form.Label className="text-muted mb-0">
                  <small>Infraction</small>
                </Form.Label>
                <Form.Control
                  onChange={this.handleSetInfraction}
                  type="text"
                  name="infraction"
                  value={this.state.infraction}
                />
              </Form.Group>
              <Form.Group as={Col} xs={6}>
                <Form.Label className="text-muted mb-0">
                  <small>Length (minutes)</small>
                </Form.Label>
                <Form.Control
                  onChange={this.handleSetLength}
                  type="number"
                  name="length"
                  value={this.state.length}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="justify-content-center">
              <Form.Group as={Col} xs={4} className="mb-0">
                <Button
                  type="submit"
                  variant="primary"
                  block
                >
                  Add Penalty
                </Button>
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }

}

export default EditPenalty