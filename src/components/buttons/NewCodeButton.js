import React from 'react'

import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const NewCodeButton = props => {
  return (
    <Button
      type="button"
      variant="primary"
      size="sm"
      className="mx-1"
      onClick={props.action}
      title={props.title}
    >
      <FontAwesomeIcon icon={faPlus} />
    </Button>
  )
}

export default NewCodeButton