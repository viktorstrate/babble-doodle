export default ({ socket, setSocketConnected, setGameState }) => {
  socket.on('connect', () => {
    console.log('connected')
    setSocketConnected(true)
  })

  socket.on('game-details', gameStateUpdates => {
    console.log('Game updates:', gameStateUpdates)
    setGameState(gameState => ({
      ...gameState,
      ...gameStateUpdates,
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
