import React, { Component } from 'react'

import Button from 'react-bootstrap/Button'

class Counter extends Component {

  state = {
    counter: 0
  }

  handleClick = e => {
    // this.setState((pS) => ({counter: pS.counter + 1}))
    console.log('a');

    fetch('http://localhost:8000/teamsfjkldjflsdjflkds', { credentials: 'include'})
      .then(resp => {
        if(resp.status !== 200) {
          throw new Error(resp.statusText);
        }
        console.log('b', resp)
        return resp.json();
      })
      .then(data => console.log('c', data))
      .catch(errors => console.log('d', errors))

    console.log('e')

    // a, e, d

  }

  render() {

    return(
      <div>
        <Button
          onClick={this.handleClick}
        >
          Increment
        </Button>
        <p>{this.state.counter}</p>

      </div>
    )

  }

}

export default Counter