import React from 'react'

import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const UserAttendingPrompt = props => {
  console.log(props)
  return (
    <>
      { shouldRender() ? renderPrompt() : null }
    </>
  )

  function shouldRender() {
    return props.tbp && props.player.details.status === 'Active'
  }

  function renderPrompt() {
    return (
    <div>
      <h3 className="my-3">Are You Attending?</h3>
      <Row className="justify-content-center">
        <Col xs md={5} lg={4} xl={2}>
          <Button
            onClick={handleIn}
            size="lg"
            variant={ props.player.attending ? "success" : "outline-success"}
            block
          >
            In
          </Button>
        </Col>
        <Col xs md={5} lg={4} xl={2}>
          <Button
            onClick={handleOut}
            size="lg"
            variant={ props.player.attending ? "outline-danger" : "danger"}
            block
          >
            Out
          </Button>          
        </Col>
      </Row>
    </div>
    )
  }

  function handleIn() {
    return !props.player.attending ? props.addPlayer(props.gameId, props.player.details.id, true) : null
  }

  function handleOut() {
    return props.player.attending ? props.removePlayer(props.gameId, props.player.details.id, true) : null
  }
}

export default UserAttendingPrompt