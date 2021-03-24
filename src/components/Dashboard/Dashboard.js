import React, { Component } from 'react'
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import { userActions } from 'actions/userActions'

import { RecentGames } from './RecentGames'
import { UpcomingGames } from './UpcomingGames'

class Dashboard extends Component {

  componentDidMount() {
    this.props.dashboard()
  }

  render(){
    return (
      <Container className="text-center" fluid>
        <Row>
          <UpcomingGames games={this.props.upcomingGames} />
          <RecentGames games={this.props.recentGames} />
        </Row>

      </Container>
    )
  }

}

const mapStateToProps = state => {
  return {
    upcomingGames: state.dashboard.upcomingGames,
    recentGames: state.dashboard.recentGames
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dashboard: () => dispatch(userActions.dashboard())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)