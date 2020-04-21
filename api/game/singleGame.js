const runningGame = require('./runningGame')
const { makeid } = require('./utils')

const initialGameState = gameId => ({
  players: [],
  state: 'lobby',
  gameId,
  internalId: makeid(),
})

const setupGame = (io, game) => {
  console.log('Setting up socket room', `/${game.id}`)

  const room = io.of(`/${game.id}`)

  let gameState = initialGameState(game.id)

  room.on('connection', async client => {
    console.log('a user connected to game', game.id)

    // Emit to new player
    emitGameDetails(client, gameState)

    const user = await userJoin(client)
    gameState.players.push(user)
    console.log(
      `client connected to room: ${gameState.players.length} players connected`
    )

    if (gameState.state == 'running' && gameState.round.state == 'drawing') {
      // Let the newly joined player be a participant
    }

    // Emit to all players
    emitPlayers(room, gameState)

    client.on('start-game', () => {
      startGame(room, gameState)
    })

    client.on('disconnect', () => {
      gameState.players = gameState.players.filter(
        x => x.client.id != client.id
      )
      console.log(
        `client disconnected from room: ${gameState.players.length} players connected`
      )

      if (gameState.players.length < 3) {
        resetGameState(gameState)
      }

      // If painter or conveyor leaves the game, reset it.
      if (gameState.state == 'running' && gameState.round.state == 'drawing') {
        const userRole = gameState.round.users[client.id]
        if (
          userRole &&
          (userRole.role == runningGame.PlayerRole.CONVEYOR ||
            userRole.role == runningGame.PlayerRole.PAINTER)
        ) {
          resetGameState(gameState)
        }
      }

      emitGameDetails(room, gameState)

      if (gameState.players.length == 0) {
        gameState = initialGameState(game.id)
      }
    })
  })
}

const userJoin = client =>
  new Promise(resolve => {
    client.once('join-game', user => {
      resolve({
        user: {
          ...user,
          id: client.id,
        },
        client,
      })
    })
  })

const resetGameState = gameState => {
  console.log('Resetting game state', gameState.gameId)

  gameState.state = 'lobby'
  gameState.internalId = makeid()
  gameState.round = null
}

const emitPlayers = (socket, gameState) => {
  socket.emit('connected-players', {
    players: gameState.players.map(x => x.user),
  })
}

const emitGameDetails = (socket, gameState) => {
  socket.emit('game-details', {
    players: gameState.players.map(x => x.user),
    state: gameState.state,
  })
}

const startGame = async (room, gameState) => {
  if (gameState.state != 'lobby') {
    console.log('Game cannot be started', gameState.gameId)
    return
  }

  if (gameState.players < 3) {
    console.log('Not enough players to start the game', gameState.gameId)
    return
  }

  await runningGame.setupRunningGame(room, gameState)
}

module.exports = {
  setupGame,
}
