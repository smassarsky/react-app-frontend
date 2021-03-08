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

    addPlayer: { show: false, player: null },
    removePlayer: { show: false, player: null }
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

  showAddPlayer = (player) => this.setState({ addPlayer: { show: true, player } })
  hideAddPlayer = () => this.setState({ addPlayer: { show: false, player: null } })
  showRemovePlayer = (player) => this.setState({ removePlayer: { show: true, player } })
  hideRemovePlayer = () => this.setState({ addPlayer: { show: false, player: null } })

  handleCreateGoal = goal => {
    this.props.createGoal(this.props.game.id, goal)
    this.hideNewGame()
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

  handleEditPenalty = penalty => {
    this.props.editPenalty(penalty)
    this.hideEditPenalty()
  }

  handleDestroyPenalty = penaltyId => {
    this.props.destroyPenalty(penaltyId)
    this.hideDestroyPenalty()
  }

  handleAddPlayer = playerId => {
    this.props.addPlayer(this.props.game.id, playerId)
    this.hideAddPlayer()
  }

  handleRemovePlayer = playerId => {
    this.props.removePlayer(this.props.game.id, playerId)
    this.hideRemovePlayer()
  }

  componentDidMount() {
    this.props.show(this.props.match.params.id)
  }

  render() {
    console.log(this.props.owner)
    return (
      <Container fluid className="text-center">
        <GamePageHeader
          teamName={this.props.game.team.name}
          seasonName={this.props.game.season.name}
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
          goals={this.props.game.goals}
          penalties={this.props.game.penalties}
          owner={this.props.owner}
          modalControls={ { showNewGoal: this.showNewGoal, showNewPenalty: this.showNewPenalty } }
        />

        <PlayerStats
          showModals={ { add: this.showAddPlayer, remove: this.showRemovePlayer } }
          players={this.props.game.playersList}
          owner={this.props.owner}
        />

        <Modals
          newGoal={ { show: this.state.newGoal, hide: this.hideNewGoal } }
          editGoal={ { show: this.state.editGoal, hide: this.hideEditGoal } }
          destroyGoal={ { show: this.state.destroyGoal, hide: this.hideDestroyGoal } }
          newPenalty={ { show: this.state.newPenalty, hide: this.hideNewPenalty } }
          editPenalty={ { show: this.state.editPenalty, hide: this.hideEditPenalty } }
          destroyPenalty={ { show: this.state.destroyPenalty, hide: this.hideDestroyPenalty } }

          addPlayer={ { show: this.state.showAddPlayer, hide: this.hideAddPlayer } }
          removePlayer={ { show: this.state.showRemovePlayer, hide: this.hideRemovePlayer } }
        />

      </Container>
    )
  }



}

const mapStateToProps = state => {
  console.log(state)
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