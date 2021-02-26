import React from 'react'
import { connect } from 'react-redux'

import TeamsTableHead from './TeamsTableHead'
import TeamsTableBody from './TeamsTableBody'


const TeamsTable = (props) => {
  return (
    <div className="my-table">
      <TeamsTableHead />
      <TeamsTableBody teams={props.teams} modals={props.modals} userId={props.userId} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.user.id
  }
}

export default connect(mapStateToProps)(TeamsTable)