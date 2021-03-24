import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { ShowButton, EditButton, DestroyButton } from 'components/buttons'

import { formatNextGame, formatLastGame, parseRecord } from 'config'

const SeasonsTableBody = props => {
  return (
    <>
      { props.seasons.map(season => renderRow(season))}
      <div>
        <small><i>* Record format: W - L - T - OTL</i></small>
      </div>
    </>
  )

  function renderRow(season) {
    return <Row className="my-tbody">
      <Col>{season.name}{season.current ? " (Current)" : ""}</Col>
      <Col>{parseRecord(season.record)}</Col>
      <Col>{formatNextGame(season.nextGame)}</Col>
      <Col>{formatLastGame(season.lastGame)}</Col>
      <Col>{renderActions(season)}</Col>
    </Row>
  }

  function renderActions(season) {
    return (
      <>
        <ShowButton to={`/seasons/${season.id}`} title="View Season" />

        { props.owner ?
          <>
            <EditButton
              action={() => props.showEdit(season)}
              title="Edit Season"
            />
            <DestroyButton
              action={() => props.showDestroy(season)}
              title="Delete Season"  
            />
          </> : null
        }
      </>
    )
  }
}

export default SeasonsTableBody