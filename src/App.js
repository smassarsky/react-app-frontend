import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Welcome from './components/Welcome'
import Login from './components/Login'
import Signup from './components/Signup'

function App() {
  return (
    <div className="App h-100">
      <Route exact path='/' component={Welcome} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
    </div>
  );
}

export default App;
