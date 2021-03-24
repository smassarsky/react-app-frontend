import React, { Component } from 'react'
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'

import { seasonActions } from '../../actions/seasonActions'
import { gameActions } from '../../actions/gameActions'

import SeasonPageHeader from './SeasonPageHeader'

import { GamesTable } from './GamesTable'
import { PlayersTable } from './PlayersTable'

import { Modals } from './Modals'

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
          team={this.props.season.team} 
          seasonName={this.props.season.name}
        />



        <GamesTable
          owner={this.props.owner}
          games={this.props.season.games}
          modals={ {
            new: this.showNewGame,
            edit: this.showEditGame,
            destroy: this.showDestroyGame
          } }
        />

        <PlayersTable 
          players={this.props.season.playersList || []}
        />

        <Modals
          new={ {
            show: this.state.newGame,
            hide: this.hideNewGame,
            action: this.handleCreateGame
          } }
          edit={ {
            show: this.state.editGame.show,
            hide: this.hideEditGame,
            action: this.handleUpdateGame,
            game: this.state.editGame.game
          } }
          destroy={ {
            show: this.state.destroyGame.show,
            hide: this.hideDestroyGame,
            action: this.handleDestroyGame,
            game: this.state.destroyGame.game
          } }
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