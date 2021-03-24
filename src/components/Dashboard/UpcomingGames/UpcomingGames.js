import React from 'react'

import Col from 'react-bootstrap/Col'

import { Header, THead, TBody } from './components'

const UpcomingGames = props => {
  return (
    <Col>
      <Header />
      { props.games.length > 0 ? renderTable() : <h4 className="my-3">No Games Yet</h4>}
    </Col>
  )

  function renderTable() {
    return (
      <div>
        <THead />
        <TBody games={props.games} />
      </div>
    )
  }
}

export default UpcomingGames