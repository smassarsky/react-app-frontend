import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'

class TeamsPage extends Component {

  state = {
    teams: [],
    forms: []
  }

  render() {
    return (
      <Container fluid className="text-center">
        <h2 className="my-3">Your Teams</h2>
      </Container>
    )
  }

}

export default TeamsPage