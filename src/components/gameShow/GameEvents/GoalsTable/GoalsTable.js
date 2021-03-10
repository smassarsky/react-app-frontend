import React from 'react'

import { THead, TBody } from './components'

const GoalsTable = (props) => {
  return (
    <div className="mt-3">
      <h4>Goals</h4>
      { props.goals.length > 0 ? renderTable() : <h6>No Goals</h6>}
    </div>
  )

  function renderTable() {
    return (
      <>
        <THead owner={props.owner}/>
        <TBody
          goals={props.goals}
          owner={props.owner}
          opponent={props.opponent}
          modalControls={props.modalControls}  
        />
      </>
    )

  }
}

export default GoalsTable