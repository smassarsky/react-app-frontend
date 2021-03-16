import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { ShowButton, EditButton, DestroyButton } from '../buttons'

const PlayersTableBody = props => {
  return (
    <>
      { props.players.map(player => renderRow(player))}
    </>
  )

  function renderRow(player) {
    return (
      <Row key={player.id} className="my-tbody">
        <Col>{player.name}</Col>
        <Col>{player.position}</Col>
        <Col>{player.jerseyNum}</Col>
        <Col>{player.stats.gamesPlayed}</Col>
        <Col>{player.stats.goals}</Col>
        <Col>{player.stats.assists}</Col>
        <Col>{player.stats.points}</Col>
        <Col>{renderActions(player)}</Col>
      </Row>
    )
  }

  function renderActions(player) {
    return(
      <>
        <ShowButton
          to={`/players/${player.id}`}
          title="View Player"
        />
        {props.owner ? 
          <>
            <EditButton
              action={() => props.modals.edit(player)}
              title="Edit Player"
            />
            <DestroyButton
              action={() => props.modals.destroy(player)}
              title="Delete Player"
            />
          </> : null
        }
      </>
    )
  }
}

export default PlayersTableBody