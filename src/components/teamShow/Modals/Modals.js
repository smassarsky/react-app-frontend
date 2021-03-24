import React from 'react'

import { NewPlayerModal, EditPlayerModal, DestroyPlayerModal, NewSeasonModal, EditSeasonModal, DestroySeasonModal, ShowCodeModal} from './components'

const Modals = props => {
  return (
    <>
      <NewSeasonModal
        {...props.newSeason}
      />

      <EditSeasonModal
        {...props.editSeason}
      />

      <DestroySeasonModal
        {...props.destroySeason}
      />


      <NewPlayerModal
        {...props.newPlayer}
      />

      <EditPlayerModal
        {...props.editPlayer}
      />

      <DestroyPlayerModal
        {...props.destroyPlayer}
      />

      <ShowCodeModal
        {...props.showCode}
      />
    </>
  )
}

export default Modals