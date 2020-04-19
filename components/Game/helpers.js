export const localPlayer = (socket, gameState) =>
  gameState.players.find(x => x.id == socket.id)

export const localPlayerRole = (socket, gameState) => {
  return (
    gameState.round &&
    gameState.round.users &&
    gameState.round.users[socket.id] &&
    gameState.round.users[socket.id].role
  )
}
