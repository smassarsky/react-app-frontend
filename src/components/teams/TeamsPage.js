import React, { Component } from 'react'

import { config } from '../../config'

import Container from 'react-bootstrap/Container'

import TeamsHeader from './TeamsHeader'
import TeamsTable from './TeamsTable'
import NewTeamModal from './NewTeamModal'

class TeamsPage extends Component {

  state = {
    teams: [],
    show: false
  }

  showModal = () => {
    this.setState({show: true})
  }

  hideModal = () => {
    this.setState({show: false})
  }

  componentDidMount() {
    fetch(`${config.baseUrl}/teams`, {credentials: 'include'})
    .then(resp => resp.json())
    .then(json =>{
      console.log(json)
      this.setState({teams: json})
    })
  }

  render() {
    return (
      <Container fluid className="text-center">
        <TeamsHeader showModal={this.showModal} />
        <TeamsTable teams={this.state.teams} />
        <NewTeamModal show={this.state.show} hideModal={this.hideModal} />
      </Container>
    )
  }

}

export default TeamsPage