import React, { Component } from 'react'
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'

import { seasonActions } from '../../actions/seasonActions'
import { playerActions } from '../../actions/playerActions'
import { teamActions } from '../../actions/teamActions'
import { playerCodeActions } from '../../actions/playerCodeActions'

import TeamPageHeader from './TeamPageHeader'
import Alerts from '../../components/Alerts'

import TeamSeasonsHeader from './TeamSeasonsHeader'
import TeamPlayersHeader from './TeamPlayersHeader'

import SeasonsTable from './SeasonsTable'
import PlayersTable from './PlayersTable'

import NewSeasonModal from './NewSeasonModal'
import EditSeasonModal from './EditSeasonModal'
import DestroySeasonModal from './DestroySeasonModal'

import NewPlayerModal from './NewPlayerModal'
import EditPlayerModal from './EditPlayerModal'
import DestroyPlayerModal from './DestroyPlayerModal'

import ShowCodeModal from './ShowCodeModal'


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

        <TeamSeasonsHeader owner={this.props.owner} showModal={this.showNewSeason} />
        <Alerts />

        { this.props.team.seasons.length > 0 ?
          <SeasonsTable 
            seasons={this.props.team.seasons} 
            owner={this.props.owner} 
            modals={ { edit: this.showEditSeason, destroy: this.showDestroySeason } }
          /> : <h4>No Seasons Yet</h4>
        }

        <TeamPlayersHeader 
          owner={this.props.owner} 
          showModal={this.showNewPlayer} 
        />

        <Alerts />

        { this.props.team.players.length > 0 ?
          <PlayersTable 
            players={this.props.team.players} 
            owner={this.props.owner} 
            modals={ { edit: this.showEditPlayer, destroy: this.showDestroyPlayer, code: this.showCode } }
            createCode={this.handleCreateCode}
            /> : <h4>No Players Yet</h4>
        }

        <NewSeasonModal
          show={this.state.showNewSeason}
          hideModal={this.hideNewSeason}
          createSeason={this.handleCreateSeason}
        />

        <EditSeasonModal
          show={this.state.editSeason.show}
          season={this.state.editSeason.season}
          hideModal={this.hideEditSeason}
          updateSeason={this.handleUpdateSeason}
        />

        <DestroySeasonModal
          show={this.state.destroySeason.show}
          season={this.state.destroySeason.season}
          hideModal={this.hideDestroySeason}
          destroySeason={this.handleDestroySeason}
        />


        <NewPlayerModal
          show={this.state.showNewPlayer}
          hideModal={this.hideNewPlayer}
          createPlayer={this.handleCreatePlayer}
        />

        <EditPlayerModal
          show={this.state.editPlayer.show}
          player={this.state.editPlayer.player}
          hideModal={this.hideEditPlayer}
          updatePlayer={this.handleUpdatePlayer}
        />

        <DestroyPlayerModal
          show={this.state.destroyPlayer.show}
          player={this.state.destroyPlayer.player}
          hideModal={this.hideDestroyPlayer}
          destroyPlayer={this.handleDestroyPlayer}
        />

        <ShowCodeModal
          show={this.state.code.show}
          player={this.props.team.players.find(player => player.id === this.state.code.playerId)}
          loading={this.props.fetchingCode}
          hideModal={this.hideCode}
        />

      </Container>
    )
  }

}

const mapStateToProps = state => {
  console.log(state)
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