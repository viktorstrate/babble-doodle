export default (socket, { setGameState }) => {
  socket.on('new-round', round => {
    console.log('New round', round)

    setGameState(gameState => ({
      ...gameState,
      round,
    }))
  })
}
