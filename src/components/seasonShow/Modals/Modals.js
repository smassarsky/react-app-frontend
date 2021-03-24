import React from 'react'

import { NewGameModal, EditGameModal, DestroyGameModal } from './components'

const Modals = props => {
  return (
    <>
      <NewGameModal
        {...props.new}
      />

      <EditGameModal
        {...props.edit}
      />

      <DestroyGameModal
        {...props.destroy}
      />
    </>
  )
}

export default Modals