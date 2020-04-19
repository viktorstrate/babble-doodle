const initialGameState = gameId => ({
  players: [],
  state: 'lobby',
  gameId,
})

const setupGame = (io, game) => {
  console.log('Setting up socket room', `/${game.id}`)

  const room = io.of(`/${game.id}`)

  let gameState = initialGameState(game.id)

  room.on('connection', async client => {
    console.log('a user connected to game', game.id)

    emitGameDetails(client, gameState)

    const user = await userJoin(client)
    gameState.players.push(user)
    console.log(
      `client connected to room: ${gameState.players.length} players connected`
    )

    emitGameDetails(room, gameState)

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

      emitGameDetails(room, gameState)

      if (gameState.players.length == 0) {
        gameState = initialGameState(game.id)
      }
    })
  })
}

const userJoin = client =>
  new Promise(resolve => {
    client.on('join-game', user => {
      resolve({
        user: {
          ...user,
          id: client.id,
        },
        client,
      })
    })
  })

const emitGameDetails = (socket, gameState) => {
  socket.emit('game-details', {
    players: gameState.players.map(x => x.user),
    state: gameState.state,
  })
}

const startGame = (room, gameState) => {
  if (gameState.state != 'lobby') {
    console.log('Game cannot be started', gameState.gameId)
    return
  }

  console.log('Starting game', gameState.gameId)
  gameState.state = 'running'
  room.emit('game-started')
}

module.exports = {
  setupGame,
}
