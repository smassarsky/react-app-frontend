import React from 'react'
import { Header, THead, TBody } from './components'

const PlayersTable = props => {
  return (
    <div className="my-3">
      <Header />
      <THead />
      <TBody players={props.players} />
    </div>
  )
}

export default PlayersTable