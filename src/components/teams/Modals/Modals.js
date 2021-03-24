import React from 'react'

import { NewTeamModal, UpdateTeamModal, DestroyTeamModal, JoinTeamModal } from './components'

const Modals = props => {
  return (
    <>
      <NewTeamModal
        {...props.newTeam}
      />

      <UpdateTeamModal 
        {...props.updateTeam}
      />

      <DestroyTeamModal 
        {...props.destroyTeam}
      />

      <JoinTeamModal
        {...props.joinTeam}
      />
    </>
  )
}

export default Modals