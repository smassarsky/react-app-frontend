import React, { Component } from 'react'
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'

import { teamActions } from '../../actions/teamActions'

import { Modals } from './Modals'

import { TeamsTable } from './TeamsTable'

class TeamsPage extends Component {

  state = {
    showNew: false,
    edit: { show: false, team: null },
    destroy: { show: false, team: null },
    showJoin: false
  }

  showNewModal = () => this.setState({showNew: true})
  hideNewModal = () => this.setState({showNew: false})

  showEditModal = (team) => this.setState({ edit: { show: true, team } })
  hideEditModal = () => this.setState({ edit: { show: false, team: null } })

  showDestroyModal = (team) => this.setState({ destroy: { show: true, team } })
  hideDestroyModal = () => this.setState({ destroy: { show: false, team: null } })

  showJoinModal = () => this.setState({ showJoin: true })
  hideJoinModal = () => this.setState({ showJoin: false })

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

        <TeamsTable
          teams={this.props.teams}
          modals={ {
            new: this.showNewModal,
            edit: this.showEditModal,
            destroy: this.showDestroyModal,
            join: this.showJoinModal
          } }
          userId={this.props.userId}
        />

        <Modals
          newTeam={ {
            show: this.state.showNew,
            hide: this.hideNewModal,
            action: this.createTeam
          } }
          updateTeam={ {
            show: this.state.edit.show,
            hide: this.hideEditModal,
            action: this.updateTeam,
            team: this.state.edit.team
          } }
          destroyTeam={ {
            show: this.state.destroy.show,
            hide: this.hideDestroyModal,
            action: this.destroyTeam,
            team: this.state.destroy.team
          } }
          joinTeam={ {
            show: this.state.showJoin,
            hide: this.hideJoinModal
          } }
        />

      </Container>
    )
  }

}

const mapStateToProps = state => {
  return {
    teams: state.teams.list,
    userId: state.user.id
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