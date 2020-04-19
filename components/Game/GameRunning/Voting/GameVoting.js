export default function GameVoting({ socket, gameStateObj }) {
  const { gameState } = gameStateObj

  const playerDrawings = gameState.round.result

  return (
    <div>
      <h1>Round has ended</h1>
      <p>Vote for your favorite</p>
    </div>
  )
}
