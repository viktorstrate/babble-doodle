export default (socket, { setGameState, gameState }) => {
  socket.on('new-round', round => {
    console.log('New round', round)

    setGameState({
      ...gameState,
      round,
    })
  })
}
