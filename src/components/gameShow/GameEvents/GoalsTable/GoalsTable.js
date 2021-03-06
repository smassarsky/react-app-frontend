import React from 'react'

import { THead, TBody } from './components'

const GoalsTable = (props) => {
  return (
    <div>
      <THead />
      <TBody
        goals={props.goals}
        owner={props.owner}
        modalControls={props.modalControls}  
      />
    </div>
  )
}

export default GoalsTable