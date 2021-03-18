import React from 'react'

import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const ShowCodeButton = props => {
  return (
    <Button
      type="button"
      variant="primary"
      size="sm"
      className="mx-1"
      title={props.title}
      onClick={props.action}
    >
      <FontAwesomeIcon icon={faPlus} />
    </Button>
  )
}

export default ShowCodeButton