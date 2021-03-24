import React, { Component } from 'react'
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'

import { seasonActions } from '../../actions/seasonActions'
import { playerActions } from '../../actions/playerActions'
import { teamActions } from '../../actions/teamActions'
import { playerCodeActions } from '../../actions/playerCodeActions'

import TeamPageHeader from './TeamPageHeader'
import Alerts from 'components/Alerts'

import { SeasonsTable } from './SeasonsTable'

import { PlayersTable } from './PlayersTable'

import { Modals } from './Modals'

class TeamShowPage extends Component {

  //state for modals
  state = {
    showNewPlayer: false,
    editPlayer: { show: false, player: null },
    destroyPlayer: { show: false, player: null },
    showNewSeason: false,
    editSeason: { show: false, season: null },
    destroySeason: { show: false, season: null },
    code: { show: false, playerId: null }
  }

  
  showNewPlayer = () => this.setState({ showNewPlayer: true })
  hideNewPlayer = () => this.setState({ showNewPlayer: false })
  showEditPlayer = (player) => this.setState({ editPlayer: { show: true, player } })
  hideEditPlayer = () => this.setState({ editPlayer: { show: false, player: null } })
  showDestroyPlayer = (player) => this.setState({ destroyPlayer: { show: true, player } })
  hideDestroyPlayer = () => this.setState({ destroyPlayer: { show: false, player: null } })

  showNewSeason = () => this.setState({ showNewSeason: true })
  hideNewSeason = () => this.setState({ showNewSeason: false })
  showEditSeason = (season) => this.setState({ editSeason: { show: true, season } })
  hideEditSeason = () => this.setState({ editSeason: { show: false, season: null } })
  showDestroySeason = (season) => this.setState({ destroySeason: { show: true, season } })
  hideDestroySeason = () => this.setState({ destroySeason: { show: false, season: null } })

  showCode = (playerId) => this.setState({ code: { show: true, playerId } })
  hideCode = () => this.setState({ code: { show: false, playerId: null } })

  handleCreateSeason = (season) => {
    this.props.createSeason(this.props.team.id, season)
    this.hideNewSeason()
  }

  handleUpdateSeason = (season) => {
    this.props.updateSeason(season)
    this.hideEditSeason()
  }

  handleDestroySeason = (seasonId) => {
    this.props.destroySeason(seasonId)
    this.hideDestroySeason()
  }

  handleCreatePlayer = (player) => {
    this.props.createPlayer(this.props.team.id, player)
    this.hideNewPlayer()
  }

  handleUpdatePlayer = (player) => {
    this.props.updatePlayer(player)
    this.hideEditPlayer()
  }

  handleDestroyPlayer = (playerId) => {
    this.props.destroyPlayer(playerId)
    this.hideDestroyPlayer()
  }

  handleCreateCode = player => {
    this.props.createCode(player.id)
    .then(() => {
      this.showCode(player.id)
    })
  }

  componentDidMount() {
    this.props.show(this.props.match.params.id)
  }

  render() {
    return (
      <Container fluid className="text-center">
        <TeamPageHeader teamName={this.props.team.name} />

        <Alerts />

        <SeasonsTable
          owner={this.props.owner}
          seasons={this.props.team.seasons}
          modals={ {
            new: this.showNewSeason,
            edit: this.showEditSeason,
            destroy: this.showDestroySeason
          } }
        />

        <PlayersTable
          owner={this.props.owner}
          players={this.props.team.players}
          createCode={this.handleCreateCode}
          modals={ {
            new: this.showNewPlayer,
            edit: this.showEditPlayer,
            destroy: this.showDestroyPlayer,
            code: this.showCode
          } }
        />

        <Modals
          newSeason={ {
            show: this.state.showNewSeason,
            hide: this.hideNewSeason,
            action: this.handleCreateSeason
          } }
          editSeason={ {
            show: this.state.editSeason.show,
            hide: this.hideEditSeason,
            action: this.handleUpdateSeason,
            season: this.state.editSeason.season
          } }
          destroySeason={ {
            show: this.state.destroySeason.show,
            hide: this.hideDestroySeason,
            action: this.handleDestroySeason,
            season: this.state.destroySeason.season
          } }
          newPlayer={ {
            show: this.state.showNewPlayer,
            hide: this.hideNewPlayer,
            action: this.handleCreatePlayer
          } }
          editPlayer={ {
            show: this.state.editPlayer.show,
            hide: this.hideEditPlayer,
            action: this.handleUpdatePlayer,
            player: this.state.editPlayer.player
          } }
          destroyPlayer={ {
            show: this.state.destroyPlayer.show,
            hide: this.hideDestroyPlayer,
            action: this.handleDestroyPlayer,
            player: this.state.destroyPlayer.player
          } }
          showCode={ {
            show: this.state.code.show,
            hide: this.hideCode,
            player: this.props.team.players.find(player => player.id === this.state.code.playerId),
            loading: this.props.fetchingCode
          } }
        />

      </Container>
    )
  }

}

const mapStateToProps = state => {
  return {
    team: state.team.details,
    owner: state.user.id === state.team.details.ownerId,
    fetchingCode: state.team.details.fetchingCode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    show: (teamId) => dispatch(teamActions.show(teamId)),
    createSeason: (teamId, season) => dispatch(seasonActions.create(teamId, season)),
    updateSeason: (season) => dispatch(seasonActions.update(season)),
    destroySeason: (seasonId) => dispatch(seasonActions.destroy(seasonId)),
    createPlayer: (teamId, player) => dispatch(playerActions.create(teamId, player)),
    updatePlayer: (playerId, player) => dispatch(playerActions.update(playerId, player)),
    destroyPlayer: (playerId) => dispatch(playerActions.destroy(playerId)),
    createCode: (playerId) => dispatch(playerCodeActions.create(playerId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamShowPage)