import React from 'react'

import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'

const PlayerPill = props => {
  return (
    <Badge pill className="ml-2" variant='secondary' >
      {props.player.name} <Button className="close" onClick={() => props.remove(props.player.id)} ><span aria-hidden="true">&times;</span></Button>
    </Badge>
  )
}

export default PlayerPill