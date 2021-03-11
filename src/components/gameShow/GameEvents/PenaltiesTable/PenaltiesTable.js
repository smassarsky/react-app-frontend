import React from 'react'

import { TBody, THead } from './components'

const PenaltiesTable = (props) => {
  return(
    <div className="mt-3">
      <h4>Penalties</h4>
      { props.penalties.length > 0 ? renderTable() : <h6>No Penalties</h6>}
    </div>
  )

  function renderTable() {
    return (
      <>
        <THead owner={props.owner} />
        <TBody 
          penalties={props.penalties}
          opponent={props.opponent}
          owner={props.owner}
          modalControls={props.modalControls}
        />
      </>
    )
  }
}

export default PenaltiesTable