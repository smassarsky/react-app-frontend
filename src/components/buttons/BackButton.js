import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const BackButton = props => {
  return (
    <LinkContainer to={props.to} activeClassName="">
      <Button 
        type="button"
        variant="primary"
        size="sm"
        className="mx-2 rounded-circle"
        title={props.title}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
    </LinkContainer>
  )
}

export default BackButton