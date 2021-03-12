import React, { Component } from 'react'
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'

import { seasonActions } from '../../actions/seasonActions'
import { gameActions } from '../../actions/gameActions'

import SeasonPageHeader from './SeasonPageHeader'
import Alerts from '../../components/Alerts'

import SeasonGamesHeader from './SeasonGamesHeader'

import GamesTable from './GamesTable'
import { PlayersTable } from './PlayersTable'

import NewGameModal from './NewGameModal'
import EditGameModal from './EditGameModal'
import DestroyGameModal from './DestroyGameModal'

class SeasonShowPage extends Component {

  //for modals
  state = {
    newGame: false,
    editGame: { show: false, game: null },
    destroyGame: { show: false, game: null }
  }

  showNewGame = () => this.setState({ newGame: true })
  hideNewGame = () => this.setState({ newGame: false })
  showEditGame = (game) => this.setState({ editGame: { show: true, game } })
  hideEditGame = () => this.setState({ editGame: { show: false, game: null } })
  showDestroyGame = (game) => this.setState({ destroyGame: { show: true, game } })
  hideDestroyGame = () => this.setState({ destroyGame: { show: false, game: null } })

  handleCreateGame = (game) => {
    this.props.createGame(this.props.season.id, game)
    this.hideNewGame()
  }

  handleUpdateGame = (game) => {
    this.props.updateGame(game)
    this.hideEditGame()
  }

  handleDestroyGame = (gameId) => {
    this.props.destroyGame(gameId)
    this.hideDestroyGame()
  }

  componentDidMount() {
    this.props.show(this.props.match.params.id)
  }

  render() {
    return (
      <Container fluid className="text-center">

        <SeasonPageHeader 
          teamName={this.props.season.team.name} 
          seasonName={this.props.season.name}
        />

        <SeasonGamesHeader
          owner={this.props.owner}
          showNewGame={this.showNewGame}
        />

        <Alerts />

        { this.props.season.games.length > 0 ?
          <GamesTable
            games={this.props.season.games}
            owner={this.props.owner}
            modals={ { edit: this.showEditGame, destroy: this.showDestroyGame } }
          /> : <h4>No Games Yet</h4>
        }

        <PlayersTable 
          players={this.props.season.playersList || []}
        />

        <NewGameModal
          show={this.state.newGame}
          hideModal={this.hideNewGame}
          createGame={this.handleCreateGame}
        />

        <EditGameModal
          show={this.state.editGame.show}
          game={this.state.editGame.game}
          hideModal={this.hideEditGame}
          updateGame={this.handleUpdateGame}
        />

        <DestroyGameModal
          show={this.state.destroyGame.show}
          game={this.state.destroyGame.game}
          hideModal={this.hideDestroyGame}
          destroyGame={this.handleDestroyGame}
        />

      </Container>
    )
  }

}


const mapStateToProps = state => {
  console.log(state)
  return {
    season: state.season.details,
    owner: state.user.id === state.season.details.team.ownerId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    show: (seasonId) => dispatch(seasonActions.show(seasonId)),
    createGame: (seasonId, game) => dispatch(gameActions.create(seasonId, game)),
    updateGame: (game) => dispatch(gameActions.update(game)),
    destroyGame: (gameId) => dispatch(gameActions.destroy(gameId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonShowPage)