export const goalValidations = {
  setScorer,
  addAssist,
  removeAssist,
  addOnIce,
  removeOnIce
}

function setScorer(prevState, playerId, players) {
  //validations
  let errors = { playerId: '' }
  if (prevState.onIces.length > 5) {
    errors.playerId += "Too many players on ice."
  }

  if (prevState.assists.find(player => player.id === playerId)) {
    errors.playerId += "Player cannot score and assist the same goal."
  }


  //no duplicate onIces (removes previous goal scorer, adds new goal scorer)
  if (errors.playerId === '') {
    let prevOnIces = prevState.onIces
    if (prevState.playerId !== playerId) {
      prevOnIces = prevOnIces.filter(onIce => onIce.id !== prevState.playerId)
    }

    if (!prevOnIces.find(player => player.id === playerId)) {
      prevOnIces = [...prevOnIces, players.find(player => player.id === playerId)]
    }

    return {
      playerId: playerId,
      onIces: prevOnIces,
      errors: {}
    }
  } else {
    return { errors }
  }

}

function addAssist(prevState, playerId, players) {
  console.log(prevState)
  let errors = { assists: '' }
  let testPlayer = players.find(player => player.id === playerId)

  if (prevState.playerId === playerId) {
    errors.assists += "Player cannot score and assist goal."
  }

  if (prevState.assists.length > 1) {
    errors.assists += "Only two assists per goal."
  }

  if (prevState.onIces.length > 5) {
    errors.assists += "Too many players on ice."
  }

  if (prevState.assists.find(assist => assist.id === playerId)) {
    errors.assists += "Player cannot assist goal twice."
  }

  console.log(errors)

  if (errors.assists === '') {
    const newOnIces = prevState.onIces.find(onIce => onIce.id === playerId) ? prevState.onIces : [...prevState.onIces, testPlayer]
    return {
      assists: [...prevState.assists, testPlayer],
      onIces: newOnIces,
      errors: {}
    }
  } else {
    return { errors }
  }
}

function removeAssist(prevState, playerId) {
  return {
    assists: prevState.assists.filter(assist => assist.id !== playerId),
    onIces: prevState.onIces.filter(onIce => onIce.id !== playerId),
    errors: {}
  }
}

function addOnIce(prevState, playerId, players) {
  let errors = { onIces: '' }

  if (prevState.onIces.length > 5) {
    errors.onIces += "Too many players on ice."
  }

  if (prevState.onIces.find(onIce => onIce.id === playerId)) {
    errors.onIces += "Player already on ice."
  }

  if (errors.onIces === '') {
    return {
      onIces: [...prevState.onIces, players.find(player => player.id === playerId)],
      errors: {}
    }
  } else {
    return { errors }
  }

}

function removeOnIce(prevState, playerId) {
  let errors = { onIces: '' }

  if (prevState.playerId === playerId) {
    errors.onIces += "Cannot remove - player scored goal."
  }

  if (prevState.assists.find(assist => assist.id === playerId)) {
    errors.onIces += "Cannot remove - player assisted goal."
  }

  if (errors.onIces === '') {
    return {
      onIces: prevState.onIces.filter(onIce => onIce.id !== playerId),
      errors: {}
    }
  } else {
    return { errors }
  }
}
