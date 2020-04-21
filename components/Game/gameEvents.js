export default ({ socket, setSocketConnected, setGameState }) => {
  socket.on('connect', () => {
    console.log('connected')
    setSocketConnected(true)
  })

  socket.on('game-details', ({ players, state }) => {
    console.log('Game updates:', state)
    setGameState(gameState => ({
      ...gameState,
      players,
      state,
    }))
  })

  socket.on('round-details', ({ round }) => {
    console.log('Round details:', round)
    setGameState(gameState => ({
      ...gameState,
      round,
    }))
  })

  socket.on('connected-players', ({ players }) => {
    console.log('Connected players', players)
    setGameState(gameState => ({
      ...gameState,
      players,
    }))
  })

  socket.on('game-started', () => {
    console.log('game started')
    setGameState(gameState => ({
      ...gameState,
      state: 'running',
    }))
  })
}
