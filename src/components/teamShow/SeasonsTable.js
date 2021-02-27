import React from 'react'

import SeasonsTableHead from './SeasonsTableHead'
import SeasonsTableBody from './SeasonsTableBody'

const SeasonsTable = props => {
  return(
    <div className="my-table">
      <SeasonsTableHead />
      <SeasonsTableBody seasons={props.seasons} modals={props.modals} owner={props.owner} />
    </div>
  )
}

export default SeasonsTable