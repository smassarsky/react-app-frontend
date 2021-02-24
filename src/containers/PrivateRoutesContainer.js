import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Navbar from '../components/Navbar'

import Dashboard from '../components/Dashboard'
import TeamsPage from '../components/teams/TeamsPage'

class PrivateRoutesContainer extends Component {

  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path={'/dashboard'} component={Dashboard} />
          <Route path={'/teams'} component={TeamsPage} />
        </Switch>
      </>
    )
  }

}

export default PrivateRoutesContainer