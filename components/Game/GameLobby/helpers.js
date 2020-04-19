export const localPlayer = (socket, gameState) =>
  gameState.players.find(x => x.id == socket.id)
