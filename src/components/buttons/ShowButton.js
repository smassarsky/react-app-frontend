import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

const ShowButton = props => {
  return (
    <LinkContainer to={props.to}>
      <Button
        type="button"
        variant="primary"
        size="sm"
        className="mx-1"
        title={props.title}
      >
        <FontAwesomeIcon icon={faExternalLinkAlt} />
      </Button>
    </LinkContainer>

  )
}

export default ShowButton