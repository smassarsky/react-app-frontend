import React from 'react'

import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const DestroyButton = props => {
  return (
    <Button
      type="button"
      variant="danger"
      size="sm"
      className="mx-1"
      title={props.title}
      onClick={props.action}
    >
      <FontAwesomeIcon icon={faTrashAlt} />
    </Button>
  )
}

export default DestroyButton