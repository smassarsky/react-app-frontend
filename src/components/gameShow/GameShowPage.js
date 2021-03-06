import React, {Component } from 'react'
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'

import { gameActions, goalActions, penaltyActions } from '../../actions'

import GamePageHeader from './GamePageHeader'
import GameEvents from './GameEvents/GameEvents'
import { PlayerStats } from './PlayerStats'

class GameShowPage extends Component {

  state = {
    newGoal: false,
    editGoal: { show: false, goal: null },
    destroyGoal: { show: false, goal: null },
    newPenalty: false,
    editPenalty: { show: false, penalty: null },
    destroyPenalty: { show: false, penalty: null }
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

  componentDidMount() {
    this.props.show(this.props.match.params.id)
  }

  render() {
    return (
      <Container fuild className="text-center">
        <GamePageHeader
          teamName={this.props.game.team.name}
          seasonName={this.props.game.season.name}
          datetime={this.props.game.datetime}
          opponent={this.props.game.opponent}
          score={this.props.game.score}
          status={this.props.game.status}
        />

        <GameEvents
          goals={this.props.game.goals}
          penalties={this.props.game.penalties}
          owner={this.props.owner}
          modalControls={ { showNewGoal: this.showNewGoal, showNewPenalty: this.showNewPenalty } }
        />

        <PlayerStats
          players={this.props.game.players}
          owner={this.props.owner}
        />

      </Container>
    )
  }



}

const mapStateToProps = state => {
  return {
    game: state.game.details,
    owner: state.user.id === state.game.details.ownerId
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
    destroyPenalty: (penaltyId) => dispatch(penaltyActions.destroy(penaltyId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameShowPage)