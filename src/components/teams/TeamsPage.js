import React, { Component } from 'react'


import Container from 'react-bootstrap/Container'

import { teamActions } from '../../actions/teamActions'

import TeamsHeader from './TeamsHeader'
import TeamsTable from './TeamsTable'
import NewTeamModal from './NewTeamModal'
import UpdateTeamModal from './UpdateTeamModal'
import DeleteTeamModal from './DeleteTeamModal'
import Alerts from '../Alerts'

class TeamsPage extends Component {

  state = {
    teams: [],
    showNew: false,
    edit: { show: false, team: null },
    delete: { show: false, team: null }
  }

  showModal = () => this.setState({showNew: true})
  hideModal = () => this.setState({showNew: false})

  showEditModal = (team) => this.setState({ edit: { show: true, team } })
  hideEditModal = () => this.setState({ edit: { show: false, team: null } })

  showDeleteModal = (team) => this.setState({ delete: { show: true, team } })
  hideDeleteModal = () => this.setState({ delete: { show: false, team: null } })

  createTeam = (name) => {
    teamActions.create(name)
    .then(team => {
      if (team.id) {
        this.setState((pS) => {
          return {teams: [team, ...pS.teams]}
        })
      }
    })
    this.hideModal()
  }

  updateTeam = (name, teamId) => {
    teamActions.update(name, teamId)
    .then(team => {
      console.log(team)
      if (team.id) {
        this.setState((pS) => {
          return {teams: pS.teams.map(stateTeam => stateTeam.id === teamId ? team : stateTeam)}
        })
        this.hideEditModal()
      }
    })
  }

  deleteTeam = () => {
    const teamId = this.state.delete.team.id
    teamActions.destroy(teamId)
    .then(deleted => {
      if (deleted) {
        this.setState((pS) => {
          return {teams: pS.teams.filter(stateTeam => stateTeam.id !== teamId)}
        })
      }
      this.hideDeleteModal()
    })
  }

  componentDidMount() {
    teamActions.index()
    .then(teams => {
      if (teams.length > 0) {
        this.setState({ teams })
      }
    })
  }

  render() {
    console.log(this.state)
    return (
      <Container fluid className="text-center">
        <TeamsHeader showModal={this.showModal} />
        <Alerts />

        {this.state.teams.length > 0 ? 
          <TeamsTable 
            teams={this.state.teams} 
            modals={ {edit: this.showEditModal, delete: this.showDeleteModal} }
          /> : <h4>No Teams Yet</h4>
        }

        <NewTeamModal 
          show={this.state.showNew} 
          hideModal={this.hideModal} 
          createTeam={this.createTeam}
        />

        <UpdateTeamModal 
          show={this.state.edit.show}
          hideModal={this.hideEditModal}
          team={this.state.edit.team}
          updateTeam={this.updateTeam}
        />

        <DeleteTeamModal 
          show={this.state.delete.show}
          hideModal={this.hideDeleteModal}
          team={this.state.delete.team}
          deleteTeam={this.deleteTeam}
        />

      </Container>
    )
  }

}

export default TeamsPage