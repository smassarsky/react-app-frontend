import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Navbar from '../components/Navbar'

import Dashboard from '../components/Dashboard'
import TeamsPage from '../components/teams/TeamsPage'
import TeamShowPage from '../components/teamShow/TeamShowPage'
import SeasonShowPage from '../components/seasonShow/SeasonShowPage'
import GameShowPage from '../components/gameShow/GameShowPage'

class PrivateRoutesContainer extends Component {

  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path={'/dashboard'} component={Dashboard} />
          <Route exact path={'/teams'} component={TeamsPage} />
          <Route exact path={'/teams/:id'} component={TeamShowPage} />
          <Route exact path={'/seasons/:id'} component={SeasonShowPage} />
          <Route exact path={'/games/:id'} component={GameShowPage} />
        </Switch>
      </>
    )
  }

}

export default PrivateRoutesContainer