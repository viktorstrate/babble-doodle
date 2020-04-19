export const localPlayer = (socket, gameState) =>
  gameState.players.find(x => x.id == socket.id)

export const localPlayerRole = (socket, gameState) => {
  return (
    gameState.round && gameState.round.roles && gameState.round.roles[socket.id]
  )
}
