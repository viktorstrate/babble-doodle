const PlayerRole = {
  PAINTER: 'painter',
  CONVEYOR: 'conveyor',
  PARTICIPANT: 'participant',
}

const setupRunningGame = (room, gameState) => {
  console.log('Starting game', gameState.gameId)
  gameState.state = 'running'
  room.emit('game-started')

  newRound(room, gameState)
}

const newRound = (room, gameState) => {
  gameState.round = {
    roles: distributeRoles(gameState),
  }

  console.log('Starting new round', JSON.stringify(gameState.round))
  room.emit('new-round', gameState.round)
}

const distributeRoles = ({ players }) => {
  const roles = {}

  const userIds = players.map(x => x.user.id)

  roles[userIds.pop()] = PlayerRole.PAINTER
  roles[userIds.pop()] = PlayerRole.CONVEYOR

  while (userIds.length > 0) roles[userIds.pop()] = PlayerRole.PARTICIPANT

  return roles
}

module.exports = {
  setupRunningGame,
}
