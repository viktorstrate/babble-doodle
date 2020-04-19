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

const newRound = async (room, gameState) => {
  // Round setup
  gameState.round = {
    users: distributeRoles(gameState),
    state: 'drawing',
  }

  console.log('Starting new round', JSON.stringify(gameState.round))
  room.emit('new-round', gameState.round)

  // Round events
  console.log('listening to painter-paint event')
  const painterPlayer = findPainterPlayer(gameState)
  painterPlayer.client.on('painter-paint', ({ image }) => {
    gameState.round.users[painterPlayer.user.id].image = image

    const conveyorPlayer = findConveyorPlayer(gameState)
    conveyorPlayer.client.emit('painter-paint', { image })
  })

  const participatingPlayers = findParticipatingPlayers(gameState)
  participatingPlayers.forEach(participant => {
    participant.client.on('participant-paint', ({ image }) => {
      console.log('Updating participant painting')
      gameState.round.users[participant.user.id].image = image
    })
  })

  console.log('Round in progress')

  await wait(1000 * 8)

  console.log('Round finished')

  // Drawing teardown

  gameState.state = 'voting'

  const result = {
    players: gameState.players.map(player => ({
      ...gameState.round.users[player.user.id],
      id: player.user.id,
    })),
  }

  gameState.players.forEach(player =>
    player.client.removeAllListeners(['painter-paint', 'participant-paint'])
  )

  room.emit('round-ended', {
    result,
    state: 'voting',
  })

  // Voting

  const playerVotePromises = gameState.players.map(
    player =>
      new Promise(done => {
        player.client.once('vote', ({ id }) => {
          done(id)

          player.client.emit('vote-acknowledged', { id })
        })
      })
  )

  const playerVotes = await Promise.all(playerVotePromises)
  console.log('All votes are in', playerVotes)

  // Score
  const votes = playerVotes.reduce((result, vote) => {
    if (result[vote] == null) {
      result[vote] = 1
    } else {
      result[vote] += 1
    }

    return result
  }, {})

  const scoreResult = Object.keys(votes).map(id => ({
    id,
    image: gameState.round.users[id].image,
    votes: votes[id],
  }))

  gameState.players.forEach(player => {
    player.client.emit('votes', scoreResult)
  })
}

const wait = ms =>
  new Promise(done => {
    setTimeout(done, ms)
  })

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
