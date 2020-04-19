export default (socket, { setGameState }) => {
  socket.on('new-round', round => {
    console.log('New round', round)

    setGameState(gameState => ({
      ...gameState,
      round,
    }))
  })

  socket.on('round-ended', ({ result, state }) => {
    console.log('Round ended', result)

    setGameState(gameState => ({
      ...gameState,
      round: {
        ...gameState.round,
        result,
        state,
      },
    }))
  })

  socket.on('vote-received', ({ id }) => {
    setGameState(gameState => ({
      ...gameState,
      round: {
        ...gameState.round,
        voted: id,
      },
    }))
  })
}
