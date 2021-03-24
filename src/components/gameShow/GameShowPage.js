import React, {Component } from 'react'
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'

import { gameActions, goalActions, penaltyActions, gamePlayerActions } from '../../actions'

import Alerts from '../Alerts'
import GamePageHeader from './GamePageHeader'
import GameEvents from './GameEvents/GameEvents'
import { PlayerStats } from './PlayerStats'
import { Modals } from './Modals'
import { UserAttendingPrompt } from './UserAttendingPrompt'

class GameShowPage extends Component {

  state = {
    newGoal: false,
    editGoal: { show: false, goal: null },
    destroyGoal: { show: false, goal: null },
    
    newPenalty: false,
    editPenalty: { show: false, penalty: null },
    destroyPenalty: { show: false, penalty: null },

    addPlayer: false,
    removePlayer: { show: false, player: { id: null, name: '' } }
  }

  showNewGoal = () => this.setState({ newGoal: true })
  hideNewGoal = () => this.setState({ newGoal: false })
  showEditGoal = (goal) => this.setState({ editGoal: { show: true, goal } })
  hideEditGoal = () => this.setState({ editGoal: { show: false, goal: null } })
  showDestroyGoal = (goal) => this.setState({ destroyGoal: { show: true, goal } })
  hideDestroyGoal = () => this.setState({ destroyGoal: { show: false, goal: null } })

  showNewPenalty = () => this.setState({ newPenalty: true })
  hideNewPenalty = () => this.setState({ newPenalty: false })
  showEditPenalty = (penalty) => this.setState({ editPenalty: { show: true, penalty } })
  hideEditPenalty = () => this.setState({ editPenalty: { show: false, penalty: null } })
  showDestroyPenalty = (penalty) => this.setState({ destroyPenalty: { show: true, penalty } })
  hideDestroyPenalty = () => this.setState({ destroyPenalty: { show: false, penalty: null } })

  showAddPlayer = () => this.setState({ addPlayer: true })
  hideAddPlayer = () => this.setState({ addPlayer: false })
  showRemovePlayer = (player) => this.setState({ removePlayer: { show: true, player } })
  hideRemovePlayer = () => this.setState({ removePlayer: { show: false, player: { id: null, name: '' } } })

  handleCreateGoal = goal => {
    this.props.createGoal(this.props.game.id, goal)
    this.hideNewGoal()
  }

  handleUpdateGoal = goal => {
    this.props.updateGoal(goal)
    this.hideEditGoal()
  }

  handleDestroyGoal = goalId => {
    this.props.destroyGoal(goalId)
    this.hideDestroyGoal()
  }

  handleCreatePenalty = penalty => {
    this.props.createPenalty(this.props.game.id, penalty)
    this.hideNewPenalty()
  }

  handleUpdatePenalty = penalty => {
    this.props.updatePenalty(penalty)
    this.hideEditPenalty()
  }

  handleDestroyPenalty = penaltyId => {
    this.props.destroyPenalty(penaltyId)
    this.hideDestroyPenalty()
  }

  handleAddPlayer = playerId => {
    //last field sets whether to update UserAttendingPrompt component
    this.props.addPlayer(this.props.game.id, playerId, parseInt(playerId) === this.props.game.usersPlayer.details.id)
    this.hideAddPlayer()
  }

  handleRemovePlayer = playerId => {
    //last field sets whether to update UserAttendingPrompt component
    this.props.removePlayer(this.props.game.id, playerId, playerId === this.props.game.usersPlayer.details.id)
    this.hideRemovePlayer()
  }

  componentDidMount() {
    this.props.show(this.props.match.params.id)
  }

  render() {
    return (
      <Container fluid className="text-center">
        <GamePageHeader
          teamName={this.props.game.team.name}
          season={this.props.game.season}
          datetime={this.props.game.datetime}
          opponent={this.props.game.opponent}
          score={this.props.game.score}
          status={this.props.game.status}
        />

        <Alerts />

        <UserAttendingPrompt
          tbp={this.props.game.status === "TBP"}
          gameId={this.props.game.id}
          player={this.props.game.usersPlayer}
          addPlayer={this.props.addPlayer}
          removePlayer={this.props.removePlayer}
        />

        <GameEvents
          goals={this.props.game.events.goals}
          penalties={this.props.game.events.penalties}
          owner={this.props.owner}
          opponent={this.props.game.opponent}
          modalControls={ {
            showNewGoal: this.showNewGoal,
            showNewPenalty: this.showNewPenalty,
            showEditGoal: this.showEditGoal,
            showEditPenalty: this.showEditPenalty,
            showDestroyGoal: this.showDestroyGoal,
            showDestroyPenalty: this.showDestroyPenalty
          } }
        />

        <PlayerStats
          showModals={ { add: this.showAddPlayer, remove: this.showRemovePlayer } }
          players={this.props.game.playersList}
          owner={this.props.owner}
        />

        <Modals
          newGoal={ { 
            show: this.state.newGoal,
            hide: this.hideNewGoal,
            submit: this.handleCreateGoal 
          } }

          editGoal={ { 
            show: this.state.editGoal.show,
            hide: this.hideEditGoal,
            submit: this.handleUpdateGoal,
            goal: this.state.editGoal.goal
          } }

          destroyGoal={ { 
            show: this.state.destroyGoal.show,
            hide: this.hideDestroyGoal,
            submit: this.handleDestroyGoal,
            goal: this.state.destroyGoal.goal
          } }

          newPenalty={ { 
            show: this.state.newPenalty,
            hide: this.hideNewPenalty,
            submit: this.handleCreatePenalty
          } }

          editPenalty={ {
            show: this.state.editPenalty.show,
            hide: this.hideEditPenalty,
            submit: this.handleUpdatePenalty,
            penalty: this.state.editPenalty.penalty
          } }

          destroyPenalty={ {
            show: this.state.destroyPenalty.show,
            hide: this.hideDestroyPenalty,
            submit: this.handleDestroyPenalty,
            penalty: this.state.destroyPenalty.penalty
          } }

          addPlayer={ {
            show: this.state.addPlayer,
            hide: this.hideAddPlayer,
            submit: this.handleAddPlayer
          } }

          removePlayer={ {
            show: this.state.removePlayer.show,
            hide: this.hideRemovePlayer,
            submit: this.handleRemovePlayer,
            player: this.state.removePlayer.player
          } }

          roster={this.props.game.team.roster}
          players={this.props.game.playersList}
          team={this.props.game.team}
          opponent={this.props.game.opponent}
        />

      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    game: state.game.details,
    owner: state.user.id === state.game.details.owner.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    show: (gameId) => dispatch(gameActions.show(gameId)),

    createGoal: (gameId, goal) => dispatch(goalActions.create(gameId, goal)),
    updateGoal: (goal) => dispatch(goalActions.update(goal)),
    destroyGoal: (goalId) => dispatch(goalActions.destroy(goalId)),

    createPenalty: (gameId, penalty) => dispatch(penaltyActions.create(gameId, penalty)),
    updatePenalty: (penalty) => dispatch(penaltyActions.update(penalty)),
    destroyPenalty: (penaltyId) => dispatch(penaltyActions.destroy(penaltyId)),

    addPlayer: (gameId, playerId, isUser) => dispatch(gamePlayerActions.add(gameId, playerId, isUser)),
    removePlayer: (gameId, playerId, isUser) => dispatch(gamePlayerActions.remove(gameId, playerId, isUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameShowPage)