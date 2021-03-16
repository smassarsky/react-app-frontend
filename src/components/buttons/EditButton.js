import React from 'react'

import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const EditButton = props => {
  return (
    <Button
      type="button"
      variant="success"
      size="sm"
      className="mx-1"
      title={props.title}
      onClick={props.action}
    >
      <FontAwesomeIcon icon={faEdit} />
    </Button>
  )
}

export default EditButton