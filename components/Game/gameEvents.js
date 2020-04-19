export default ({ socket, setSocketConnected, setGameState }) => {
  socket.on('connect', () => {
    console.log('connected')
    setSocketConnected(true)
  })

  socket.on('game-details', ({ players, state }) => {
    console.log('connected players:', players)
    setGameState(gameState => ({
      ...gameState,
      players,
      state,
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
