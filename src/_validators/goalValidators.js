export const goalValidations = {
  setScorer,
  addAssist,
  removeAssist,
  addOnIce,
  removeOnIce,
  setTime,
  setTeam
}

function setScorer(prevState, playerId, players) {
  //validations
  if (playerId === -99) {
    return { 
      player: { id: ''},
      onIcePlayers: prevState.onIcePlayers.filter(player => player.id !== prevState.player.id)
    }
  }
  let scorer = players.find(player => player.id === playerId)
  let errors = { player: '' }
  if (prevState.onIcePlayers.length > 5) {
    errors.player += "Too many players on ice."
  }

  if (prevState.assistPlayers.find(player => player.id === playerId)) {
    errors.player += "Player cannot score and assist the same goal."
  }


  //no duplicate onIces (removes previous goal scorer, adds new goal scorer)
  if (errors.player === '') {
    let prevOnIcePlayers = prevState.onIcePlayers
    if (prevState.player.id !== playerId) {
      prevOnIcePlayers = prevOnIcePlayers.filter(tempPlayer => tempPlayer.id !== prevState.player.id)
    }

    if (!prevOnIcePlayers.find(player => player.id === playerId)) {
      prevOnIcePlayers = [...prevOnIcePlayers, players.find(player => player.id === playerId)]
    }

    return {
      player: scorer,
      onIcePlayers: prevOnIcePlayers,
      errors: {}
    }
  } else {
    return { errors }
  }

}

function addAssist(prevState, playerId, players) {
  const outPlayer = players.find(player => player.id === playerId)

  let errors = { assistPlayers: '' }

  if (prevState.player.id === playerId) {
    errors.assistPlayers += "Player cannot score and assist goal."
  }

  if (prevState.assistPlayers.length > 1) {
    errors.assistPlayers += "Only two assists per goal."
  }

  if (prevState.onIcePlayers.length > 5) {
    errors.assistPlayers += "Too many players on ice."
  }

  if (prevState.assistPlayers.find(player => player.id === playerId)) {
    errors.assistPlayers += "Player cannot assist goal twice."
  }

  if (errors.assistPlayers === '') {
    const newOnIcePlayers = prevState.onIcePlayers.find(player => player.id === playerId) ? prevState.onIcePlayers : [...prevState.onIcePlayers, outPlayer]
    return {
      assistPlayers: [...prevState.assistPlayers, outPlayer],
      onIcePlayers: newOnIcePlayers,
      errors: {}
    }
  } else {
    return { errors }
  }
}

function removeAssist(prevState, playerId) {
  return {
    assistPlayers: prevState.assistPlayers.filter(player => player.id !== playerId),
    onIcePlayers: prevState.onIcePlayers.filter(player => player.id !== playerId),
    errors: {}
  }
}

function addOnIce(prevState, playerId, players) {
  let errors = { onIcePlayers: '' }

  const outPlayer = players.find(player => player.id === playerId)

  if (prevState.onIcePlayers.length > 5) {
    errors.onIcePlayers += "Too many players on ice."
  }

  if (prevState.onIcePlayers.find(player => player.id === playerId)) {
    errors.onIcePlayers += "Player already on ice."
  }

  if (errors.onIcePlayers === '') {
    return {
      onIcePlayers: [...prevState.onIcePlayers, outPlayer],
      errors: {}
    }
  } else {
    return { errors }
  }

}

function removeOnIce(prevState, playerId) {
  let errors = { onIcePlayers: '' }

  if (prevState.player.id && prevState.player.id === playerId) {
    errors.onIcePlayers += "Cannot remove - player scored goal."
  }

  if (prevState.assistPlayers.find(player => player.id === playerId)) {
    errors.onIcePlayers += "Cannot remove - player assisted goal."
  }

  if (errors.onIcePlayers === '') {
    return {
      onIcePlayers: prevState.onIcePlayers.filter(player => player.id !== playerId),
      errors: {}
    }
  } else {
    return { errors }
  }
}

function setTime(prevState, event) {
  const updateField = event.target.name
  const updateValue = parseInt(event.target.value)

  let outMinutes = 0
  let outSeconds = 0

  if (updateField === 'minutes') {
    if (updateValue >= 20) {
      outMinutes = 20
      outSeconds = 0
    } else if (updateValue < 0) {
      outMinutes = 0
      outSeconds = prevState.seconds
    } else {
      outMinutes = updateValue
      outSeconds = prevState.seconds
    }
  } else {
    if (prevState.minutes > 19) {
      if (updateValue >= 0) {
        outMinutes = 20
        outSeconds = 0
      } else {
        outMinutes = 19
        outSeconds = 59
      }
    } else if (prevState.minutes === 0) {
      if (updateValue > 59) {
        outMinutes = 1
        outSeconds = 0
      } else if (updateValue < 0) {
        outMinutes = 0
        outSeconds = 0
      } else {
        outMinutes = 0
        outSeconds = updateValue
      }
    }
    else {
      if (updateValue > 59) {
        outMinutes = prevState.minutes + 1
        outSeconds = 0
      } else if (updateValue < 0) {
        outMinutes = prevState.minutes - 1
        outSeconds = 59
      } else {
        outMinutes = prevState.minutes
        outSeconds = updateValue
      }
    }
  }

  return {
    minutes: outMinutes,
    seconds: outSeconds,
    errors: {}
  }
}

function setTeam(prevState, fieldValue, team) {
  let errors = { team: '' }
  if (fieldValue === '') {
    if (prevState.team.id) {
      errors.team += "Please remove goal scorer before changing team."
    } 

    if (prevState.assistPlayers.length > 0) {
      errors.team += "Please remove assists before changing team."
    }

    return errors.team === '' ? { team: {}, errors: {} } : { errors }

  } else {
    return { team, errors: {} }
  }
}