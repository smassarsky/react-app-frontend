import React, { Component } from 'react'
import { connect } from 'react-redux'


import Container from 'react-bootstrap/Container'

import { teamActions } from '../../actions/teamActions'

import TeamsHeader from './TeamsHeader'
import TeamsTable from './TeamsTable'
import NewTeamModal from './NewTeamModal'
import UpdateTeamModal from './UpdateTeamModal'
import DestroyTeamModal from './DestroyTeamModal'
import Alerts from '../Alerts'

class TeamsPage extends Component {

  state = {
    showNew: false,
    edit: { show: false, team: null },
    destroy: { show: false, team: null }
  }

  showNewModal = () => this.setState({showNew: true})
  hideNewModal = () => this.setState({showNew: false})

  showEditModal = (team) => this.setState({ edit: { show: true, team } })
  hideEditModal = () => this.setState({ edit: { show: false, team: null } })

  showDestroyModal = (team) => this.setState({ destroy: { show: true, team } })
  hideDestroyModal = () => this.setState({ destroy: { show: false, team: null } })

  createTeam = (name) => {
    this.props.create(name)
    this.hideNewModal()
  }

  updateTeam = (name, teamId) => {
    this.props.update(name, teamId)
    this.hideEditModal()
  }

  destroyTeam = (teamId) => {
    this.props.destroy(teamId)
    this.hideDestroyModal()
  }

  componentDidMount() {
    this.props.index()
  }

  render() {
    return (
      <Container fluid className="text-center">
        <TeamsHeader showNewModal={this.showNewModal} />
        <Alerts />

        {this.props.teams.length > 0 ? 
          <TeamsTable 
            teams={this.props.teams} 
            modals={ {edit: this.showEditModal, destroy: this.showDestroyModal} }
          /> : <h4>No Teams Yet</h4>
        }

        <NewTeamModal 
          show={this.state.showNew} 
          hideModal={this.hideNewModal} 
          createTeam={this.createTeam}
        />

        <UpdateTeamModal 
          show={this.state.edit.show}
          hideModal={this.hideEditModal}
          team={this.state.edit.team}
          updateTeam={this.updateTeam}
        />

        <DestroyTeamModal 
          show={this.state.destroy.show}
          hideModal={this.hideDestroyModal}
          team={this.state.destroy.team}
          destroyTeam={this.destroyTeam}
        />

      </Container>
    )
  }

}

const mapStateToProps = state => {
  return {
    teams: state.teams.list
  }
}

const mapDispatchToProps = dispatch => {
  return {
    index: () => dispatch(teamActions.index()),
    create: (name) => dispatch(teamActions.create(name)),
    update: (name, teamId) => dispatch(teamActions.update(name, teamId)),
    destroy: (teamId) => dispatch(teamActions.destroy(teamId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage)