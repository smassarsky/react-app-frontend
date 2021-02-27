import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Navbar from '../components/Navbar'

import Dashboard from '../components/Dashboard'
import TeamsPage from '../components/teams/TeamsPage'
import TeamShowPage from '../components/teamShow/TeamShowPage'

class PrivateRoutesContainer extends Component {

  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path={'/dashboard'} component={Dashboard} />
          <Route exact path={'/teams'} component={TeamsPage} />
          <Route exact path={'/teams/:id'} component={TeamShowPage} />
        </Switch>
      </>
    )
  }

}

export default PrivateRoutesContainer