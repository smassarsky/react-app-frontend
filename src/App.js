import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'

import { history } from './_helpers/history'
import { alertActions } from './actions/alertActions'

import Welcome from './components/Welcome'
import Login from './components/Login'
import Signup from './components/Signup'
import { PrivateRoute } from './components/PrivateRoute'
import PrivateRoutesContainer from './containers/PrivateRoutesContainer'

class App extends Component {

  constructor(props) {
    super(props)

    history.listen((location, actions) => {
      this.props.clearAlerts()
    })
  }
  
  render() {
    return (
      <div className="App h-100">
        <Router history={history} >
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <PrivateRoute path='/' component={PrivateRoutesContainer} />
          </Switch>
        </Router>

      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearAlerts: () => dispatch(alertActions.clear())
  }
}

export default connect(null, mapDispatchToProps)(App)
