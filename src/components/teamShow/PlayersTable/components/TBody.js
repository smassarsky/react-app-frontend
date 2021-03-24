import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { ShowButton, EditButton, DestroyButton, NewCodeButton, ShowCodeButton } from 'components/buttons'

const TBody = props => {
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
            {maybePlayerCodeButtons(player)}
            <EditButton
              action={() => props.showEdit(player)}
              title="Edit Player"
            />
            <DestroyButton
              action={() => props.showDestroy(player)}
              title="Delete Player"
            />
          </> : null
        }
      </>
    )
  }

  function maybePlayerCodeButtons(player) {
    if (player.playerCode) {
      return (
        <ShowCodeButton
          action={() => props.showCode(player.id)}
          title="Show User Code"
        />
      )
    } else if (!player.user) {
      return (
        <NewCodeButton
          action={() => props.createCode(player)}
          title='Create Code' 
        />
      )
    } else {
      return null
    }
  }
}

export default TBody