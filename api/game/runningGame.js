const groupBy = require('lodash/groupBy')

const PlayerRole = {
  PAINTER: 'painter',
  CONVEYOR: 'conveyor',
  PARTICIPANT: 'participant',
}

const setupRunningGame = async (room, gameState) => {
  console.log('Starting game', gameState.gameId)
  gameState.state = 'running'
  room.emit('game-started')

  const runningGameInternalId = gameState.internalId
  const isCanceled = () => {
    const canceled = gameState.internalId != runningGameInternalId
    if (canceled) console.log('Game is canceled')
    return canceled
  }

  let playAnotherRound = true
  while (playAnotherRound) {
    playAnotherRound = await newRound(room, gameState, isCanceled)
  }
}

const newRound = async (room, gameState, isCanceled = () => false) => {
  if (isCanceled()) return false

  // Round setup
  gameState.round = {
    users: distributeRoles(gameState),
    state: 'drawing',
  }

  let countdownTime = 2 * 60 * 1000 // 2 minutes

  if (process.env.NODE_ENV != 'production') {
    countdownTime = 10 * 1000 // 10 seconds in development
  }

  console.log('Starting new round', JSON.stringify(gameState.round))
  room.emit('new-round', {
    ...gameState.round,
    countdownTime,
  })

  // Round events
  console.log('listening to painter-paint event')

  const playersByRole = groupBy(
    gameState.players,
    player => gameState.round.users[player.user.id].role
  )

  const painterPlayer = playersByRole[PlayerRole.PAINTER][0]
  painterPlayer.client.on('painter-paint', ({ image }) => {
    gameState.round.users[painterPlayer.user.id].image = image

    const conveyorPlayer = playersByRole[PlayerRole.CONVEYOR][0]
    conveyorPlayer.client.emit('painter-paint', { image })
  })

  const participatingPlayers = playersByRole[PlayerRole.PARTICIPANT]
  participatingPlayers.forEach(participant => {
    participant.client.on('participant-paint', ({ image }) => {
      gameState.round.users[participant.user.id].image = image
    })
  })

  console.log('Round in progress')

  await wait(countdownTime)

  console.log('Round finished')

  // Drawing teardown

  gameState.players.forEach(player =>
    player.client.removeAllListeners(['painter-paint', 'participant-paint'])
  )

  if (isCanceled()) return

  // Voting
  gameState.round.state = 'voting'

  const result = {
    players: gameState.players.map(player => ({
      ...gameState.round.users[player.user.id],
      id: player.user.id,
    })),
  }

  room.emit('round-ended', {
    result,
  })

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
  if (isCanceled()) return false

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

  // Wait for all players to vote new round

  const playersVotedNewRound = gameState.players.map(
    player =>
      new Promise(done => {
        player.client.once('new-round', () => {
          done()
        })
      })
  )

  console.log('Waiting for players to vote for a new round')

  await Promise.all(playersVotedNewRound)
  if (isCanceled()) return false

  gameState.round = {}

  console.log('All players voted to start a new round')
  return true
}

const wait = ms =>
  new Promise(done => {
    setTimeout(done, ms)
  })

const distributeRoles = ({ players }) => {
  const users = {}

  const userIds = players.map(x => x.user.id)

  // Shuffle user ids
  for (const i in userIds) {
    const j = Math.floor(Math.random() * userIds.length)
    const tmp = userIds[i]
    userIds[i] = userIds[j]
    userIds[j] = tmp
  }

  users[userIds.pop()] = { role: PlayerRole.PAINTER }
  users[userIds.pop()] = { role: PlayerRole.CONVEYOR }

  while (userIds.length > 0)
    users[userIds.pop()] = { role: PlayerRole.PARTICIPANT }

  return users
}

module.exports = {
  setupRunningGame,
}
