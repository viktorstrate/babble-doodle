export default ({
  socket,
  setSocketConnected,
  gameStateObj: { gameState, setGameState },
}) => {
  socket.on('connect', () => {
    console.log('connected')
    setSocketConnected(true)
  })

  socket.on('game-details', ({ players, state }) => {
    console.log('connected players:', players)
    setGameState({
      ...gameState,
      players,
      state,
    })
  })

  socket.on('game-started', () => {
    console.log('game started')
    setGameState({
      ...gameState,
      state: 'running',
    })
  })
}
