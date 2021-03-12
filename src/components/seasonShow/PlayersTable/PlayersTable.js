import React from 'react'
import { Header, THead, TBody } from './components'

const PlayersTable = props => {
  console.log(props.players)
  return (
    <div className="my-3">
      <Header />
      <THead />
      <TBody players={props.players} />
    </div>
  )
}

export default PlayersTable