import React, { Component } from 'react'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import PlayerPill from './PlayerPill'

import { goalValidations } from '../../../../_validators/goalValidators'
import InputError from '../../../InputError'

import { periods } from '../../../../config'

class NewGoal extends Component {

  state = {
    playerId: 0,
    assists: [],
    onIces: [],
    teamId: '',
    period: '',
    minutes: '',
    seconds: '',
    errors: {}
  }

  handleSetScorer = e => {
    if (e.target.value !== '') {
      const playerId = parseInt(e.target.value)
      this.setState((pS) => goalValidations.setScorer(pS, playerId, this.props.players))
    }
  }

  handleAddAssist = e => {
    if (e.target.value !== '') {
      const playerId = parseInt(e.target.value)
      this.setState((pS) => goalValidations.addAssist(pS, playerId, this.props.players),
      () => {
        e.target.value = ''
      }
      )
    }
  }

  handleRemoveAssist = playerId => {
    this.setState((pS) => goalValidations.removeAssist(pS, playerId))
  }

  handleAddOnIce = e => {
    if (e.target.value !== '') {
      const playerId = parseInt(e.target.value)
      this.setState((pS) => goalValidations.addOnIce(pS, playerId, this.props.players),
      () => {
        e.target.value = ''
      })
    }
  }

  handleRemoveOnIce = playerId => {
    this.setState((pS) => goalValidations.removeOnIce(pS, playerId))
  }

  setTeam = e => {
    this.setState({ teamId: e.target.value })
    console.log(this.state)
  }

  setPeriod = e => {

  }

  handleUpdateTime = e => {
    this.setState((prevState) => {
      return {[e.target.name]: e.target.value}
    })
  }

  renderOptions = () => {
    return (
      <>
        <option value=''>Pick a player...</option>
        {this.props.players.map(player => this.renderPlayerOption(player))}
      </>
    )
  }

  renderPlayerOption = player => <option key={player.id} value={player.id}>{player.name}</option>

  renderTeams = () => {
    return (
      <>
        <option value=''>{this.props.opponent}</option>
        <option value={this.props.team.id}>{this.props.team.name}</option>
      </>
    )
  }

  renderPeriodOptions = () => {
    console.log(periods)
    let out = []
    for (const key in periods) {
      console.log(key)
      out.push(<option value={key}>{periods[key]}</option>)
    }
    return out
  }
  
  render() {
    console.log(periods)
    return (
      <Modal show={this.props.show} onHide={this.props.hide} centered="true">
        <Modal.Body>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label className="text-muted mb-0">
                <small>Team</small>
              </Form.Label>
              <Form.Control
                onChange={this.setTeam}
                as="select"
                name="team"
                value={this.state.teamId}
                
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
                onChange={this.setPeriod}
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
                <small>Scorer</small>
              </Form.Label>
              <Form.Control
                onChange={this.handleSetScorer}
                as="select"
                name="player"
                value={this.state.playerId}
                disabled={this.state.teamId === '' ? true : false}
              >
                {this.renderOptions()}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <InputError message={this.state.errors.playerId} />
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label className="text-muted mb-0">
                <small>Assists</small>
              </Form.Label>
              <Form.Control
                onChange={this.handleAddAssist}
                as="select"
                name="assists"
                disabled={this.state.teamId === '' ? true : false}
              >
                {this.renderOptions()}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <InputError message={this.state.errors.assists} />
          <Form.Row>
            {this.state.assists.map(assist => <PlayerPill key={`assist-${assist.id}`} player={assist} remove={this.handleRemoveAssist} />)}
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label className="text-muted mb-0">
                <small>Players on Ice</small>
              </Form.Label>
              <Form.Control
                onChange={this.handleAddOnIce}
                as="select"
                name="onIces"
              >
                {this.renderOptions()}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <InputError message={this.state.errors.onIces} />
          <Form.Row>
            {this.state.onIces.map(onIce => <PlayerPill key={`onIce-${onIce.id}`} player={onIce} remove={this.handleRemoveOnIce} />)}
          </Form.Row>
          <Form.Row className="justify-content-center">
            <Form.Group as={Col} xs={4} className="mb-0">
              <Button 
                type="button"
                variant="primary"
                block
              >
                Add Goal
              </Button>              
            </Form.Group>

          </Form.Row>
        </Modal.Body>

      </Modal>
    )
  }
}

export default NewGoal