export const penaltyValidations = {
  setTime,
  setLength,
  setTeam,
  setPlayer
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

function setLength(e) {
  const nextVal = parseInt(e.target.value)
  return { length: nextVal >= 0 ? nextVal : 0 }
}

function setTeam(prevState, fieldValue, team) {
  let errors = { team: '' }
  if (fieldValue === '') {
    if (prevState.team.id) {
      errors.team += "Please remove player before changing team."
    }
    return errors.team === '' ? { team: {}, errors: {} } : { errors }
  } else {
    return { team, errors: {} }
  }

}

function setPlayer(prevState, playerId, players) {
  if (playerId === -99) {
    return { player: { id: '' } }
  } else {
    return { player: players.find(player => player.id === playerId)}
  }
}