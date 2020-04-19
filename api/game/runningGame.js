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

  console.log('listening to painter-paint event')

  const painterPlayer = findPainterPlayer(gameState)
  painterPlayer.client.on('painter-paint', ({ image }) => {
    painterPlayer.image = image

    const conveyorPlayer = findConveyorPlayer(gameState)
    conveyorPlayer.client.emit('painter-paint', { image })
  })

  const participatingPlayers = findParticipatingPlayers(gameState)
  participatingPlayers.forEach(participant => {
    participant.client.on('participant-paint', ({ image }) => {
      console.log('Updating participant painting')
      participant.image = image
    })
  })
}

const findConveyorPlayer = gameState =>
  gameState.players.find(
    player => gameState.round.users[player.user.id].role == PlayerRole.CONVEYOR
  )

const findPainterPlayer = gameState =>
  gameState.players.find(
    player => gameState.round.users[player.user.id].role == PlayerRole.PAINTER
  )

const findParticipatingPlayers = gameState =>
  gameState.players.filter(
    player =>
      gameState.round.users[player.user.id].role == PlayerRole.PARTICIPANT
  )

const newRound = (room, gameState) => {
  gameState.round = {
    users: distributeRoles(gameState),
  }

  console.log('Starting new round', JSON.stringify(gameState.round))
  room.emit('new-round', gameState.round)
}

const distributeRoles = ({ players }) => {
  const users = {}

  const userIds = players.map(x => x.user.id)

  users[userIds.pop()] = { role: PlayerRole.PAINTER }
  users[userIds.pop()] = { role: PlayerRole.CONVEYOR }

  while (userIds.length > 0)
    users[userIds.pop()] = { role: PlayerRole.PARTICIPANT }

  return users
}

module.exports = {
  setupRunningGame,
}
